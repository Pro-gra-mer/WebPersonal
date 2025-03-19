package com.rebecaperez.portfolio.exception;

/**
 * Excepción personalizada que indica que la cuenta del usuario no está activada.
 * <p>
 * Esta excepción se lanza cuando se intenta acceder a funcionalidades o recursos
 * que requieren una cuenta activada, pero la cuenta se encuentra inactiva.
 * </p>
 */
public class AccountNotActivatedException extends RuntimeException {

  /**
   * Construye una nueva instancia de AccountNotActivatedException con el mensaje especificado.
   *
   * @param message el mensaje descriptivo de la excepción.
   */
  public AccountNotActivatedException(String message) {
    super(message);
  }
}
