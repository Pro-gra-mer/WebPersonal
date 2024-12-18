package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.PasswordResetToken;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.repository.PasswordResetTokenRepository;
import com.rebecaperez.portfolio.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordResetTokenRepository tokenRepository;

  @Autowired
  private final PasswordEncoder passwordEncoder;

  private final EmailService emailService;

  public static final String USER_ROLE = "USER";

  @Autowired
  public UserService(UserRepository userRepository, PasswordResetTokenRepository tokenRepository,
                     PasswordEncoder passwordEncoder, EmailService emailService) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
    this.passwordEncoder = passwordEncoder;
    this.emailService = emailService;
  }

  public User registerNewUser(String username, String email, String password) {
    if (emailExists(email)) {
      throw new RuntimeException("El correo electrónico ya está en uso.");
    }
    if (usernameExists(username)) {
      throw new RuntimeException("El nombre de usuario ya está en uso.");
    }

    String encodedPassword = passwordEncoder.encode(password);

    User user = new User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(encodedPassword);
    user.setRole(USER_ROLE);

    return userRepository.save(user);
  }

  public boolean emailExists(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  public boolean usernameExists(String username) {
    return userRepository.findByUsername(username).isPresent();
  }

  public User authenticate(String email, String password) {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

    // Verificar si la cuenta está habilitada
    if (!user.isEnabled()) {
      throw new RuntimeException("La cuenta no está confirmada. Por favor, verifica tu correo.");
    }

    // Verificar si la contraseña es válida
    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new RuntimeException("Credenciales inválidas.");
    }

    return user;
  }


  // Enviar enlace de recuperación
  public void sendPasswordResetLink(String email) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isEmpty()) {
      throw new RuntimeException("No se encontró un usuario con el correo proporcionado.");
    }

    User user = userOptional.get();

    // Eliminar tokens existentes para este usuario
    tokenRepository.deleteByUser(user);

    String resetToken = UUID.randomUUID().toString();
    LocalDateTime expirationTime = LocalDateTime.now().plusHours(1);

    PasswordResetToken passwordResetToken = new PasswordResetToken();
    passwordResetToken.setUser(user);
    passwordResetToken.setToken(resetToken);
    passwordResetToken.setExpirationTime(expirationTime);
    tokenRepository.save(passwordResetToken);

    String resetLink = "http://localhost:4200/reset-password?token=" + resetToken;

    String subject = "Restablecimiento de contraseña";
    String message = "Hola, " + user.getUsername() + ",\n\n"
      + "Haz clic en el siguiente enlace para restablecer tu contraseña:\n"
      + resetLink + "\n\n"
      + "Si no solicitaste este cambio, ignora este mensaje.\n\n"
      + "Atentamente,\nTu equipo.";

    emailService.sendEmail(email, subject, message);
  }


  // Validar token
  @Transactional
  public void validatePasswordResetToken(String token) {
    Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
    if (tokenOptional.isEmpty()) {
      throw new RuntimeException("Token inválido o no encontrado.");
    }

    PasswordResetToken passwordResetToken = tokenOptional.get();

    // Verificar si el token ha expirado
    if (passwordResetToken.getExpirationTime().isBefore(LocalDateTime.now())) {
      tokenRepository.delete(passwordResetToken); // Eliminar token expirado
      throw new RuntimeException("El token ha expirado.");
    }
  }


  // Cambiar contraseña
  public void resetPassword(String token, String newPassword) {
    Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
    if (tokenOptional.isEmpty()) {
      throw new RuntimeException("Token inválido.");
    }

    PasswordResetToken passwordResetToken = tokenOptional.get();

    // Verificar nuevamente la validez del token antes de cambiar la contraseña
    if (passwordResetToken.getExpirationTime().isBefore(LocalDateTime.now())) {
      tokenRepository.delete(passwordResetToken); // Eliminar token expirado
      throw new RuntimeException("El token ha expirado.");
    }

    User user = passwordResetToken.getUser();

    // Cambiar la contraseña
    String encodedPassword = passwordEncoder.encode(newPassword);
    user.setPassword(encodedPassword);
    userRepository.save(user);

    // Invalidar el token
    tokenRepository.deleteByToken(token);
  }

  @Transactional
  public void invalidateToken(String token) {
    tokenRepository.deleteByToken(token); // Eliminar el token de la base de datos
  }

  public void sendAccountConfirmationEmail(User user) {
    String confirmationToken = UUID.randomUUID().toString();
    LocalDateTime expirationTime = LocalDateTime.now().plusHours(24);

    PasswordResetToken accountToken = new PasswordResetToken();
    accountToken.setUser(user);
    accountToken.setToken(confirmationToken);
    accountToken.setExpirationTime(expirationTime);
    tokenRepository.save(accountToken);

    String confirmationLink = "http://localhost:8080/auth/confirm-account?token=" + confirmationToken;


    String subject = "Confirma tu cuenta";
    String message = "Hola, " + user.getUsername() + ",\n\n"
      + "Al hacer clic en el siguiente enlace se activará tu cuenta y se te redirigirá al inicio de sesión:\n"
      + confirmationLink + "\n\n"
      + "Este enlace será válido por 24 horas.\n\n"
      + "Atentamente,\nRebeca Pérez.";

    emailService.sendEmail(user.getEmail(), subject, message);
  }

  @Transactional
  public void confirmAccount(String token) {
    Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
    if (tokenOptional.isEmpty()) {
      throw new RuntimeException("Token inválido o no encontrado.");
    }

    PasswordResetToken accountToken = tokenOptional.get();

    // Verificar si el token ha expirado
    if (accountToken.getExpirationTime().isBefore(LocalDateTime.now())) {
      tokenRepository.delete(accountToken); // Eliminar token expirado
      throw new RuntimeException("El token ha expirado.");
    }

    User user = accountToken.getUser();
    user.setEnabled(true); // Activar la cuenta
    userRepository.save(user); // Persistir el cambio en la base de datos

    tokenRepository.delete(accountToken); // Eliminar token usado
  }



}
