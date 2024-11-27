package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.dto.LoginRequest;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.service.UserService;
import com.rebecaperez.portfolio.dto.RegisterRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final UserService userService;
  private final SecretKey secretKey;

  // Constructor para inicializar la clave secreta
  @Autowired
  public AuthController(UserService userService) {
    this.userService = userService;
    // Usa una clave suficientemente larga y segura
    String encodedKey = Base64.getEncoder().encodeToString("mySuperSecretKey1234567890".getBytes());
    this.secretKey = Keys.hmacShaKeyFor(encodedKey.getBytes());
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
    // Verificar si el email o el nombre de usuario ya existen usando la instancia de userService
    if (userService.emailExists(request.getEmail())) {
      return new ResponseEntity<>("El correo electrónico ya está en uso.", HttpStatus.BAD_REQUEST);
    }

    if (userService.usernameExists(request.getUsername())) {
      return new ResponseEntity<>("El nombre de usuario ya está en uso.", HttpStatus.BAD_REQUEST);
    }

    // Registrar al nuevo usuario, cifrando su contraseña
    User newUser = userService.registerNewUser(request.getUsername(), request.getEmail(), request.getPassword());

    // Generar el JWT para el nuevo usuario
    String token = Jwts.builder()
      .setSubject(newUser.getEmail())  // Usamos el email como 'sub' (sujeto) del JWT
      .claim("username", newUser.getUsername())  // Añadimos el "username" al JWT
      .claim("role", "USER")  // Default role, puedes cambiarlo según sea necesario
      .signWith(secretKey)
      .compact();

    // Devolver el token JWT en la respuesta
    return new ResponseEntity<>(token, HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    // Verificar que el email y la contraseña sean correctos
    User user = userService.authenticate(request.getEmail(), request.getPassword());
    if (user == null) {
      return new ResponseEntity<>("Credenciales inválidas", HttpStatus.UNAUTHORIZED);
    }

    long expirationTime = 3600000; // 1 hora en milisegundos
    long currentTimeMillis = System.currentTimeMillis();
    String username = user.getUsername();

    // Generar el JWT para el usuario autenticado
    String token = Jwts.builder()
      .setSubject(user.getEmail()) // Usa email como subject
      .claim("username", username) // Añadimos el "username" al JWT
      .claim("role", user.getRole()) // Añade el rol como claim
      .setIssuedAt(new Date(currentTimeMillis)) // Fecha de emisión
      .setExpiration(new Date(currentTimeMillis + expirationTime)) // Fecha de expiración
      .signWith(secretKey) // Firma con la clave secreta
      .compact();

    return new ResponseEntity<>(token, HttpStatus.OK);
  }
}
