package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.dto.ForgotPasswordRequest;
import com.rebecaperez.portfolio.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {

  private final UserService userService;

  public ForgotPasswordController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
    boolean isSent = userService.sendResetPasswordEmail(request.getEmail());
    if (isSent) {
      return ResponseEntity.ok("Correo de recuperación enviado.");
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Correo no encontrado.");
    }
  }
}
