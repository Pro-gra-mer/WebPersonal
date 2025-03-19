package com.rebecaperez.portfolio.dto;

/**
 * Representa la solicitud de registro de un usuario.
 * <p>
 * Esta clase contiene los datos necesarios para registrar un usuario,
 * incluyendo nombre de usuario, correo electrónico y contraseña.
 * </p>
 */
public class RegisterRequest {
  private String username;
  private String email;
  private String password;

  /**
   * Obtiene el nombre de usuario.
   *
   * @return el nombre de usuario.
   */
  public String getUsername() {
    return username;
  }

  /**
   * Establece el nombre de usuario.
   *
   * @param username el nombre de usuario a establecer.
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * Obtiene el correo electrónico.
   *
   * @return el correo electrónico.
   */
  public String getEmail() {
    return email;
  }

  /**
   * Establece el correo electrónico.
   *
   * @param email el correo electrónico a establecer.
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * Obtiene la contraseña.
   *
   * @return la contraseña.
   */
  public String getPassword() {
    return password;
  }

  /**
   * Establece la contraseña.
   *
   * @param password la contraseña a establecer.
   */
  public void setPassword(String password) {
    this.password = password;
  }
}
