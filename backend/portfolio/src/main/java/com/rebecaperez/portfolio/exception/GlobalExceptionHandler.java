package com.rebecaperez.portfolio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  // Manejo de UsernameNotFoundException
  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Usuario no encontrado");
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // Devuelve 404
  }

  // Manejo de excepciones por credenciales inválidas
  @ExceptionHandler(CredentialsException.class)
  public ResponseEntity<Map<String, String>> handleCredentialsException(CredentialsException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Credenciales inválidas");
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // Devuelve 401
  }

  // Manejo genérico para cuenta no activa
  @ExceptionHandler(AccountNotActivatedException.class)
  public ResponseEntity<Map<String, String>> handleAccountNotActivatedException(AccountNotActivatedException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Cuenta no activada");
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // Devuelve 403
  }



}
