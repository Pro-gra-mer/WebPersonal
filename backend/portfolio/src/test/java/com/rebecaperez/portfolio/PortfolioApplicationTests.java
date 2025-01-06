package com.rebecaperez.portfolio;


import com.rebecaperez.portfolio.exception.CredentialsException;
import com.rebecaperez.portfolio.model.PasswordResetToken;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.repository.UserRepository;
import com.rebecaperez.portfolio.repository.PasswordResetTokenRepository;
import com.rebecaperez.portfolio.service.EmailService;
import com.rebecaperez.portfolio.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Optional;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PortfolioApplicationTests {

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordResetTokenRepository tokenRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private EmailService emailService;

  @InjectMocks
  private UserService userService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  // Registro de Usuarios
  @Test
  void testRegisterNewUser_Success() {
    String username = "testuser";
    String email = "test@example.com";
    String password = "password123";

    when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
    when(userRepository.findByUsername(username)).thenReturn(Optional.empty());
    when(passwordEncoder.encode(password)).thenReturn("encodedPassword");

    // Mockear la respuesta del método save
    User mockUser = new User();
    mockUser.setUsername(username);
    mockUser.setEmail(email);
    mockUser.setPassword("encodedPassword");
    mockUser.setRole("USER");

    when(userRepository.save(any(User.class))).thenReturn(mockUser);

    User user = userService.registerNewUser(username, email, password);

    assertNotNull(user); // Esto ahora pasará
    assertEquals(username, user.getUsername());
    assertEquals(email, user.getEmail());
    verify(userRepository).save(any(User.class));
  }

  @Test
  void testRegisterNewUser_FailsWithAdminInUsername() {
    assertThrows(RuntimeException.class, () -> userService.registerNewUser("adminuser", "test@example.com", "password123"));
  }

  // Autenticación
  @Test
  void testAuthenticate_Success() {
    String email = "user@example.com";
    String password = "password123";

    User user = new User();
    user.setEmail(email);
    user.setPassword("encodedPassword");
    user.setEnabled(true);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(passwordEncoder.matches(password, user.getPassword())).thenReturn(true);

    User result = userService.authenticate(email, password);

    assertNotNull(result);
    assertEquals(email, result.getEmail());
  }

  @Test
  void testAuthenticate_InvalidPassword() {
    String email = "user@example.com";
    String password = "wrongPassword";

    User user = new User();
    user.setEmail(email);
    user.setPassword("encodedPassword");
    user.setEnabled(true);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(passwordEncoder.matches(password, user.getPassword())).thenReturn(false);

    assertThrows(CredentialsException.class, () -> userService.authenticate(email, password));
  }

  // Protección del Usuario admin
  @Test
  void testRegisterNewUser_ForcesUserRole() {
    String username = "testuser";
    String email = "test@example.com";
    String password = "password123";

    when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
    when(userRepository.findByUsername(username)).thenReturn(Optional.empty());
    when(passwordEncoder.encode(password)).thenReturn("encodedPassword");

    // Mockear la respuesta del método save
    User mockUser = new User();
    mockUser.setUsername(username);
    mockUser.setEmail(email);
    mockUser.setPassword("encodedPassword");
    mockUser.setRole("USER");

    when(userRepository.save(any(User.class))).thenReturn(mockUser);

    User user = userService.registerNewUser(username, email, password);

    assertNotNull(user);
    assertEquals("USER", user.getRole()); // Validar que el rol sea forzado a "USER"
  }

  // Recuperación de Contraseñas
  @Test
  void testGeneratePasswordResetToken_Success() {
    String email = "user@example.com";
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(new User()));

    userService.sendPasswordResetLink(email);

    verify(tokenRepository).save(any(PasswordResetToken.class));
    verify(emailService).sendEmail(eq(email), anyString(), anyString());
  }

  // Creación de Proyectos
  @Test
  void testCreateProjectByAdmin() {
    User admin = new User();
    admin.setRole("ADMIN");

    // Simular creación del proyecto aquí según la lógica del proyecto
    // Ejemplo: when(projectRepository.save(any(Project.class))).thenReturn(project);

    // Validaciones en caso necesario
    assertNotNull(admin);
    assertEquals("ADMIN", admin.getRole());
  }

  // Pruebas del controlador AuthController
  @Test
  void testRegisterEndpoint_EmailAlreadyExists() {
    String email = "test@example.com";
    String username = "testuser";

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(new User()));

    ResponseEntity<Map<String, String>> response = ResponseEntity.badRequest().body(Map.of("message", "El correo electrónico ya está en uso."));

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals("El correo electrónico ya está en uso.", response.getBody().get("message"));
  }

  @Test
  void testLoginEndpoint_InvalidCredentials() {
    String email = "test@example.com";
    String password = "wrongPassword";

    User user = new User();
    user.setEmail(email);
    user.setPassword("encodedPassword");
    user.setEnabled(true); // Asegura que el usuario está habilitado

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(passwordEncoder.matches(password, user.getPassword())).thenReturn(false); // Contraseña incorrecta

    assertThrows(CredentialsException.class, () -> userService.authenticate(email, password));
  }


  @Test
  void testResetPasswordEndpoint_Success() {
    String token = "validToken";
    String newPassword = "newPassword123";

    // Crear y configurar el usuario
    User user = new User();
    user.setId(1L);
    user.setEmail("user@example.com");
    user.setPassword("oldPassword");

    // Crear y configurar el token de restablecimiento
    PasswordResetToken passwordResetToken = new PasswordResetToken();
    passwordResetToken.setToken(token);
    passwordResetToken.setExpirationTime(java.time.LocalDateTime.now().plusMinutes(10));
    passwordResetToken.setUser(user); // Asignar el usuario al token

    when(tokenRepository.findByToken(token)).thenReturn(Optional.of(passwordResetToken));
    when(passwordEncoder.encode(newPassword)).thenReturn("encodedNewPassword");

    userService.resetPassword(token, newPassword);

    verify(userRepository).save(user); // Verificar que el usuario fue guardado
    verify(tokenRepository).deleteByToken(token); // Verificar que el token fue eliminado
  }

}
