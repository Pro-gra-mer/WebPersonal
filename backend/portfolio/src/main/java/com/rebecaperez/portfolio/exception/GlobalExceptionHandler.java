package com.rebecaperez.portfolio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Manejador global de excepciones para la aplicación.
 * <p>
 * Esta clase intercepta excepciones específicas y retorna respuestas HTTP adecuadas junto
 * con mensajes de error personalizados para facilitar el manejo de errores en el cliente.
 * </p>
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
  /**
   * Constructor por defecto.
   * <p>
   * Spring Boot crea automáticamente una instancia de esta clase para manejar excepciones.
   * </p>
   */
  public GlobalExceptionHandler() {}

  /**
   * Maneja la excepción UsernameNotFoundException.
   * <p>
   * Retorna una respuesta HTTP 404 (Not Found) con un mapa que contiene el mensaje de error.
   * </p>
   *
   * @param ex la excepción UsernameNotFoundException lanzada.
   * @return un ResponseEntity con el código de estado 404 y detalles del error.
   */
  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Usuario no encontrado");
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // Devuelve 404
  }

  /**
   * Maneja las excepciones relacionadas con credenciales inválidas.
   * <p>
   * Retorna una respuesta HTTP 401 (Unauthorized) con un mapa que contiene el mensaje de error.
   * </p>
   *
   * @param ex la excepción CredentialsException lanzada.
   * @return un ResponseEntity con el código de estado 401 y detalles del error.
   */
  @ExceptionHandler(CredentialsException.class)
  public ResponseEntity<Map<String, String>> handleCredentialsException(CredentialsException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Credenciales inválidas");
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // Devuelve 401
  }

  /**
   * Maneja las excepciones relacionadas con cuentas no activadas.
   * <p>
   * Retorna una respuesta HTTP 403 (Forbidden) con un mapa que contiene el mensaje de error.
   * </p>
   *
   * @param ex la excepción AccountNotActivatedException lanzada.
   * @return un ResponseEntity con el código de estado 403 y detalles del error.
   */
  @ExceptionHandler(AccountNotActivatedException.class)
  public ResponseEntity<Map<String, String>> handleAccountNotActivatedException(AccountNotActivatedException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Cuenta no activada");
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // Devuelve 403
  }
}
