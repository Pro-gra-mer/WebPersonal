package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.dto.LoginRequest;
import com.rebecaperez.portfolio.dto.RegisterRequest;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

/**
 * Controlador REST para gestionar la autenticación de usuarios.
 * Maneja el registro, inicio de sesión, restablecimiento de contraseñas y confirmación de cuentas.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final UserService userService;
  private final SecretKey secretKey;

  @Autowired
  private final PasswordEncoder passwordEncoder;

  /**
   * Constructor del controlador de autenticación.
   *
   * @param userService el servicio de usuarios {@link UserService}
   * @param passwordEncoder el codificador de contraseñas {@link PasswordEncoder}
   */
  @Autowired
  public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;

    // Cargar la clave secreta desde la variable de entorno
    String encodedKey = System.getenv("JWT_SECRET_KEY");
    if (encodedKey == null || encodedKey.isEmpty()) {
      throw new IllegalStateException("JWT_SECRET_KEY no está configurada en las variables de entorno.");
    }
    this.secretKey = Keys.hmacShaKeyFor(encodedKey.getBytes());
  }

  /**
   * Registra un nuevo usuario en el sistema.
   *
   * @param request el objeto {@link RegisterRequest} con los datos del usuario (nombre, email, contraseña)
   * @return una respuesta {@link ResponseEntity} con el token JWT si el registro es exitoso o un mensaje de error
   */
  @PostMapping("/register")
  public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
    // Verificar si el email ya existe
    if (userService.emailExists(request.getEmail())) {
      return ResponseEntity.badRequest().body(Map.of("message", "El correo electrónico ya está en uso."));
    }
    // Verificar si el nombre de usuario ya existe
    if (userService.usernameExists(request.getUsername())) {
      return ResponseEntity.badRequest().body(Map.of("message", "El nombre de usuario ya está en uso."));
    }

    try {
      // Intentar registrar al nuevo usuario
      User newUser = userService.registerNewUser(request.getUsername(), request.getEmail(), request.getPassword());

      // Enviar el correo de confirmación
      userService.sendAccountConfirmationEmail(newUser);

      // Generar el JWT para el nuevo usuario
      String token = Jwts.builder()
        .setSubject(newUser.getEmail())
        .claim("username", newUser.getUsername())
        .claim("role", "USER")
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Expiración de 1 hora
        .signWith(secretKey)
        .compact();

      return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("token", token));
    } catch (RuntimeException e) {
      // Manejar cualquier excepción lanzada desde el servicio
      return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
  }

  /**
   * Inicia sesión para un usuario existente.
   *
   * @param request el objeto {@link LoginRequest} con las credenciales (email y contraseña)
   * @return una respuesta {@link ResponseEntity} con el token JWT si las credenciales son válidas o un mensaje de error
   */
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
    // Verificar las credenciales del usuario
    User user = userService.authenticate(request.getEmail(), request.getPassword());
    if (user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Credenciales inválidas"));
    }

    // Generar el JWT para el usuario autenticado
    String token = Jwts.builder()
      .setSubject(user.getEmail())
      .claim("username", user.getUsername())
      .claim("role", user.getRole())
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Expiración de 1 hora
      .signWith(secretKey)
      .compact();

    return ResponseEntity.ok(Map.of("token", token));
  }

  /**
   * Solicita un enlace para restablecer la contraseña.
   *
   * @param payload un mapa con el email del usuario
   * @return una respuesta {@link ResponseEntity} con un mensaje de éxito o error
   */
  @PostMapping("/request-password-reset")
  public ResponseEntity<Map<String, String>> requestPasswordReset(@RequestBody Map<String, String> payload) {
    if (payload == null || !payload.containsKey("email") || payload.get("email").isEmpty()) {
      return ResponseEntity.badRequest().body(Map.of("message", "Debes proporcionar un correo válido."));
    }

    String email = payload.get("email");

    try {
      userService.sendPasswordResetLink(email); // Envía el correo con el enlace
      return ResponseEntity.ok(Map.of("message", "Enlace de recuperación enviado al correo."));
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(Map.of("message", "Error al enviar el enlace: " + e.getMessage()));
    }
  }

  /**
   * Valida un token de restablecimiento de contraseña.
   *
   * @param token el token recibido como parámetro en la URL
   * @return una respuesta {@link ResponseEntity} con un mensaje de éxito o error
   */
  @GetMapping("/validate-reset-token")
  public ResponseEntity<Map<String, String>> validateResetToken(@RequestParam String token) {
    try {
      userService.validatePasswordResetToken(token);
      return ResponseEntity.ok(Map.of("message", "Token válido. Puedes proceder a cambiar tu contraseña."));
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
  }

  /**
   * Restablece la contraseña de un usuario usando un token válido.
   *
   * @param payload un mapa con el token y la nueva contraseña
   * @return una respuesta {@link ResponseEntity} con un mensaje de éxito o error
   */
  @PostMapping("/reset-password")
  public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> payload) {
    String token = payload.get("token");
    String newPassword = payload.get("newPassword");

    if (token == null || token.isEmpty()) {
      return ResponseEntity.badRequest().body(Map.of("message", "El token es requerido."));
    }

    if (newPassword == null || newPassword.isEmpty()) {
      return ResponseEntity.badRequest().body(Map.of("message", "La nueva contraseña es requerida."));
    }

    try {
      userService.validatePasswordResetToken(token); // Valida el token
      userService.resetPassword(token, newPassword); // Actualiza la contraseña
      userService.invalidateToken(token); // Invalida el token
      return ResponseEntity.ok(Map.of("message", "Contraseña actualizada exitosamente."));
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(Map.of("message", "Error: " + e.getMessage()));
    }
  }

  /**
   * Confirma la cuenta de un usuario mediante un token.
   *
   * @param token el token recibido como parámetro en la URL
   * @param response el objeto {@link HttpServletResponse} para redirigir al frontend
   * @throws IOException si ocurre un error al redirigir
   */
  @GetMapping("/confirm-account")
  public void confirmAccount(@RequestParam String token, HttpServletResponse response) throws IOException {
    if (token == null || token.isEmpty()) {
      response.sendRedirect("http://rebecaperezportfolio.com/login?error=token_required");
      return;
    }

    try {
      userService.confirmAccount(token);
      response.sendRedirect("http://rebecaperezportfolio.com/login?confirmed=true");
    } catch (RuntimeException e) {
      response.sendRedirect("http://rebecaperezportfolio.com/login?error=" + e.getMessage());
    }
  }
}
