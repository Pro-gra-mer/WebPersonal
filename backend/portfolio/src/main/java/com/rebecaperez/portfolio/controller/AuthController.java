package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.dto.LoginRequest;
import com.rebecaperez.portfolio.dto.RegisterRequest;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final UserService userService;
  private final SecretKey secretKey;
  private final BCryptPasswordEncoder passwordEncoder;

  @Autowired
  public AuthController(UserService userService) {
    this.userService = userService;
    this.passwordEncoder = new BCryptPasswordEncoder();

    // Cargar la clave secreta desde la variable de entorno
    String encodedKey = System.getenv("JWT_SECRET_KEY");
    if (encodedKey == null || encodedKey.isEmpty()) {
      throw new IllegalStateException("JWT_SECRET_KEY no está configurada en las variables de entorno.");
    }
    this.secretKey = Keys.hmacShaKeyFor(encodedKey.getBytes());
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
    // Verificar si el email o el nombre de usuario ya existen
    if (userService.emailExists(request.getEmail())) {
      return new ResponseEntity<>("El correo electrónico ya está en uso.", HttpStatus.BAD_REQUEST);
    }
    if (userService.usernameExists(request.getUsername())) {
      return new ResponseEntity<>("El nombre de usuario ya está en uso.", HttpStatus.BAD_REQUEST);
    }

    // Cifrar la contraseña antes de almacenarla en la base de datos
    String encodedPassword = passwordEncoder.encode(request.getPassword());

    // Registrar al nuevo usuario
    User newUser = userService.registerNewUser(request.getUsername(), request.getEmail(), encodedPassword);

    // Generar el JWT para el nuevo usuario
    String token = Jwts.builder()
      .setSubject(newUser.getEmail())
      .claim("username", newUser.getUsername())
      .claim("role", "USER") // Rol predeterminado
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Expiración de 1 hora
      .signWith(secretKey)
      .compact();

    return new ResponseEntity<>(token, HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    // Verificar las credenciales del usuario
    User user = userService.authenticate(request.getEmail(), request.getPassword());
    if (user == null) {
      return new ResponseEntity<>("Credenciales inválidas", HttpStatus.UNAUTHORIZED);
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

    return new ResponseEntity<>(token, HttpStatus.OK);
  }
}
