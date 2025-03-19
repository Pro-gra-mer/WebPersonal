package com.rebecaperez.portfolio.exception;

/**
 * Excepción personalizada para errores relacionados con las credenciales.
 * <p>
 * Esta excepción se lanza cuando se detectan problemas durante el proceso de autenticación,
 * como credenciales incorrectas o insuficientes.
 * </p>
 */
public class CredentialsException extends RuntimeException {

  /**
   * Construye una nueva instancia de CredentialsException con el mensaje especificado.
   *
   * @param message el mensaje descriptivo del error.
   */
  public CredentialsException(String message) {
    super(message);
  }
}
