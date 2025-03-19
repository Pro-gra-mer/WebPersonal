package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.exception.AccountNotActivatedException;
import com.rebecaperez.portfolio.exception.CredentialsException;
import com.rebecaperez.portfolio.model.PasswordResetToken;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.repository.PasswordResetTokenRepository;
import com.rebecaperez.portfolio.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * Servicio para gestionar operaciones relacionadas con usuarios,
 * tales como registro, autenticación, gestión de tokens para restablecimiento
 * y confirmación de cuenta, y limpieza de usuarios inactivos.
 */
@Service
public class UserService {

  /**
   * Repositorio para la entidad {@link User}.
   */
  private final UserRepository userRepository;

  /**
   * Repositorio para la entidad {@link PasswordResetToken}.
   */
  private final PasswordResetTokenRepository tokenRepository;

  /**
   * Codificador de contraseñas.
   */
  private final PasswordEncoder passwordEncoder;

  /**
   * Servicio para el envío de correos electrónicos.
   */
  private final EmailService emailService;

  /**
   * Rol por defecto asignado a los nuevos usuarios.
   */
  public static final String USER_ROLE = "USER";

  /**
   * Constructor que inyecta las dependencias necesarias para gestionar usuarios.
   *
   * @param userRepository   repositorio de usuarios.
   * @param tokenRepository  repositorio de tokens de restablecimiento de contraseña.
   * @param passwordEncoder  codificador de contraseñas.
   * @param emailService     servicio para el envío de correos electrónicos.
   */
  @Autowired
  public UserService(UserRepository userRepository, PasswordResetTokenRepository tokenRepository,
                     PasswordEncoder passwordEncoder, EmailService emailService) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
    this.passwordEncoder = passwordEncoder;
    this.emailService = emailService;
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * <p>
   * Valida que el correo y el nombre de usuario no estén en uso, y que el nombre de usuario no contenga
   * "admin" ni sea igual a "Rebeca Pérez". La contraseña se almacena de forma encriptada.
   * </p>
   *
   * @param username el nombre de usuario.
   * @param email    el correo electrónico.
   * @param password la contraseña en texto plano.
   * @return el usuario registrado.
   * @throws RuntimeException si el correo o el nombre de usuario ya están en uso o si el nombre de usuario es inválido.
   */
  public User registerNewUser(String username, String email, String password) {
    if (emailExists(email)) {
      throw new RuntimeException("El correo electrónico ya está en uso.");
    }
    if (usernameExists(username)) {
      throw new RuntimeException("El nombre de usuario ya está en uso.");
    }
    if (username.toLowerCase().contains("admin") ||
      username.equalsIgnoreCase("Rebeca Pérez")) {
      throw new RuntimeException("El nombre de usuario no puede contener 'admin' ni ser igual a 'Rebeca Pérez'.");
    }

    String encodedPassword = passwordEncoder.encode(password);

    User user = new User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(encodedPassword);
    user.setRole(USER_ROLE);

    return userRepository.save(user);
  }

  /**
   * Verifica si un correo electrónico ya existe en el sistema.
   *
   * @param email el correo electrónico a verificar.
   * @return {@code true} si el correo ya está en uso; {@code false} en caso contrario.
   */
  public boolean emailExists(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  /**
   * Verifica si un nombre de usuario ya existe en el sistema.
   *
   * @param username el nombre de usuario a verificar.
   * @return {@code true} si el nombre de usuario ya está en uso; {@code false} en caso contrario.
   */
  public boolean usernameExists(String username) {
    return userRepository.findByUsername(username).isPresent();
  }

  /**
   * Autentica un usuario mediante correo electrónico y contraseña.
   * <p>
   * Primero, busca el usuario por su correo. Si no se encuentra, lanza {@link UsernameNotFoundException}.
   * Luego, verifica si la cuenta está activada y si la contraseña proporcionada coincide con la almacenada.
   * </p>
   *
   * @param email    el correo electrónico del usuario.
   * @param password la contraseña en texto plano.
   * @return el usuario autenticado.
   * @throws AccountNotActivatedException si la cuenta no está activada.
   * @throws CredentialsException         si la contraseña es incorrecta.
   */
  public User authenticate(String email, String password) {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

    // Verificar si la cuenta está activada
    if (!user.isEnabled()) {
      throw new AccountNotActivatedException("Cuenta no activada. Verifica tu correo para activarla.");
    }

    // Verificar si la contraseña es correcta
    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new CredentialsException("Credenciales inválidas.");
    }

    return user;
  }

  /**
   * Elimina los usuarios inactivos que fueron creados hace más de 24 horas.
   * <p>
   * Este método se utiliza para limpiar los registros de usuarios que no han activado su cuenta.
   * </p>
   */
  @Transactional
  public void deleteInactiveUsers() {
    LocalDateTime expirationTime = LocalDateTime.now().minusHours(24);
    userRepository.deleteInactiveUsersBefore(expirationTime);
  }

  /**
   * Envía un enlace de restablecimiento de contraseña al correo electrónico del usuario.
   * <p>
   * Elimina cualquier token existente para el usuario, genera uno nuevo con validez de 1 hora,
   * lo guarda en el repositorio y envía un correo con el enlace de restablecimiento.
   * </p>
   *
   * @param email el correo electrónico del usuario.
   * @throws RuntimeException si no se encuentra el usuario con el correo proporcionado.
   */
  public void sendPasswordResetLink(String email) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isEmpty()) {
      throw new RuntimeException("No se encontró un usuario con el correo proporcionado.");
    }

    User user = userOptional.get();

    // Eliminar tokens existentes para este usuario
    tokenRepository.deleteByUser(user);

    // Generar un nuevo token de restablecimiento
    String resetToken = UUID.randomUUID().toString();
    LocalDateTime expirationTime = LocalDateTime.now().plusHours(1);

    PasswordResetToken passwordResetToken = new PasswordResetToken();
    passwordResetToken.setUser(user);
    passwordResetToken.setToken(resetToken);
    passwordResetToken.setExpirationTime(expirationTime);
    tokenRepository.save(passwordResetToken);

    String resetLink = "http://rebecaperezportfolio.com/reset-password?token=" + resetToken;

    String subject = "Restablecimiento de contraseña";
    String message = "Hola, " + user.getUsername() + ",\n\n"
      + "Haz clic en el siguiente enlace para restablecer tu contraseña:\n"
      + resetLink + "\n\n"
      + "Si no solicitaste este cambio, ignora este mensaje.\n\n"
      + "Atentamente,\nRebeca Pérez.";

    emailService.sendEmail(email, subject, message);
  }

  /**
   * Valida un token de restablecimiento de contraseña.
   * <p>
   * Verifica que el token exista y que no haya expirado. Si el token ha expirado, se elimina y se lanza una excepción.
   * </p>
   *
   * @param token el token a validar.
   * @throws RuntimeException si el token es inválido, no se encuentra o ha expirado.
   */
  @Transactional
  public void validatePasswordResetToken(String token) {
    Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
    if (tokenOptional.isEmpty()) {
      throw new RuntimeException("Token inválido o no encontrado.");
    }

    PasswordResetToken passwordResetToken = tokenOptional.get();

    if (passwordResetToken.getExpirationTime().isBefore(LocalDateTime.now())) {
      tokenRepository.delete(passwordResetToken);
      throw new RuntimeException("El token ha expirado.");
    }
  }

  /**
   * Restablece la contraseña de un usuario utilizando un token de restablecimiento.
   * <p>
   * Valida el token, actualiza la contraseña del usuario (después de encriptarla) y elimina el token.
   * </p>
   *
   * @param token       el token de restablecimiento.
   * @param newPassword la nueva contraseña en texto plano.
   * @throws RuntimeException si el token es inválido o ha expirado.
   */
  @Transactional
  public void resetPassword(String token, String newPassword) {
    Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
    if (tokenOptional.isEmpty()) {
      throw new RuntimeException("Token inválido.");
    }

    PasswordResetToken passwordResetToken = tokenOptional.get();

    if (passwordResetToken.getExpirationTime().isBefore(LocalDateTime.now())) {
      tokenRepository.delete(passwordResetToken);
      throw new RuntimeException("El token ha expirado.");
    }

    User user = passwordResetToken.getUser();
    String encodedPassword = passwordEncoder.encode(newPassword);
    user.setPassword(encodedPassword);
    userRepository.save(user);

    tokenRepository.deleteByToken(token);
  }

  /**
   * Invalida un token de restablecimiento eliminándolo del repositorio.
   *
   * @param token el token a invalidar.
   */
  @Transactional
  public void invalidateToken(String token) {
    tokenRepository.deleteByToken(token);
  }

  /**
   * Envía un correo de confirmación de cuenta al usuario.
   * <p>
   * Genera un token de confirmación con validez de 24 horas, lo guarda y envía un enlace
   * al correo del usuario para activar su cuenta.
   * </p>
   *
   * @param user el usuario que debe confirmar su cuenta.
   */
  public void sendAccountConfirmationEmail(User user) {
    String confirmationToken = UUID.randomUUID().toString();
    LocalDateTime expirationTime = LocalDateTime.now().plusHours(24);

    PasswordResetToken accountToken = new PasswordResetToken();
    accountToken.setUser(user);
    accountToken.setToken(confirmationToken);
    accountToken.setExpirationTime(expirationTime);
    tokenRepository.save(accountToken);

    String confirmationLink = "https://portfolio-backend-latest-veuz.onrender.com/auth/confirm-account?token=" + confirmationToken;

    String subject = "Confirma tu cuenta";
    String message = "Hola, " + user.getUsername() + ",\n\n"
      + "Gracias por registrarte. Al hacer clic en el siguiente enlace se activará tu cuenta y se te redirigirá al inicio de sesión:\n"
      + confirmationLink + "\n\n"
      + "Este enlace será válido por 24 horas.\n\n"
      + "Atentamente,\nRebeca Pérez.";

    emailService.sendEmail(user.getEmail(), subject, message);
  }

  /**
   * Confirma la cuenta del usuario utilizando un token de confirmación.
   * <p>
   * Valida el token, activa la cuenta del usuario y elimina el token.
   * </p>
   *
   * @param token el token de confirmación.
   * @throws RuntimeException si el token es inválido, no se encuentra o ha expirado.
   */
  @Transactional
  public void confirmAccount(String token) {
    Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
    if (tokenOptional.isEmpty()) {
      throw new RuntimeException("Token inválido o no encontrado.");
    }

    PasswordResetToken accountToken = tokenOptional.get();

    if (accountToken.getExpirationTime().isBefore(LocalDateTime.now())) {
      tokenRepository.delete(accountToken);
      throw new RuntimeException("El token ha expirado.");
    }

    User user = accountToken.getUser();
    user.setEnabled(true);
    userRepository.save(user);
    tokenRepository.delete(accountToken);
  }

  /**
   * Programador de tareas para la limpieza de usuarios inactivos.
   * <p>
   * Esta clase interna se encarga de ejecutar periódicamente la eliminación de usuarios
   * que no han activado su cuenta en las últimas 24 horas.
   * </p>
   */
  @Component
  public class UserCleanupScheduler {

    private final UserService userService;

    /**
     * Constructor que inyecta el servicio de usuarios.
     *
     * @param userService el servicio de usuarios.
     */
    public UserCleanupScheduler(UserService userService) {
      this.userService = userService;
    }

    /**
     * Ejecuta la limpieza de usuarios inactivos a medianoche todos los días.
     */
    @Scheduled(cron = "0 0 0 * * ?") // Medianoche todos los días
    public void cleanupInactiveUsers() {
      userService.deleteInactiveUsers();
    }
  }
}
