package com.rebecaperez.portfolio.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AdminPassword {
  public static void main(String[] args) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String rawPassword = "a1234567"; // Cambia la contraseña según tus necesidades
    String encodedPassword = encoder.encode(rawPassword);
    System.out.println("Contraseña cifrada: " + encodedPassword);
    System.out.println("JWT_SECRET_KEY: " + System.getenv("JWT_SECRET_KEY"));

  }
}
