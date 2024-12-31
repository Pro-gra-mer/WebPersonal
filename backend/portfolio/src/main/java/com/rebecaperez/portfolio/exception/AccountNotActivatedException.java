package com.rebecaperez.portfolio.exception;

public class AccountNotActivatedException extends RuntimeException {
  public AccountNotActivatedException(String message) {
    super(message);
  }
}
