package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.dto.LoginRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final SecretKey secretKey;

  // Constructor para inicializar la clave secreta
  public AuthController() {
    // Usa una clave suficientemente larga y segura
    String encodedKey = Base64.getEncoder().encodeToString("mySuperSecretKey1234567890".getBytes());
    this.secretKey = Keys.hmacShaKeyFor(encodedKey.getBytes());
  }

  @PostMapping("/login")
  public String login(@RequestBody LoginRequest request) {
    if ("admin@example.com".equals(request.getEmail()) && "password".equals(request.getPassword())) {
      long expirationTime = 3600000; // 1 hora en milisegundos
      long currentTimeMillis = System.currentTimeMillis();
      String username = request.getEmail().split("@")[0];

      return Jwts.builder()
              .setSubject(request.getEmail()) // Usa email como subject
              .claim("username", username)    // Añadimos el "username" al JWT
              .claim("role", "ADMIN")         // Añade el rol como claim
              .setIssuedAt(new Date(currentTimeMillis)) // Fecha de emisión
              .setExpiration(new Date(currentTimeMillis + expirationTime)) // Fecha de expiración
              .signWith(secretKey)            // Firma con la clave secreta
              .compact();
    }
    throw new RuntimeException("Credenciales inválidas");
  }
}

