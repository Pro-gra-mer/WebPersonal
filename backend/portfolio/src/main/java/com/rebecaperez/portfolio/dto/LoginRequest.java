package com.rebecaperez.portfolio.dto;

/**
 * Clase DTO (Data Transfer Object) para representar una solicitud de inicio de sesión.
 * Contiene los datos necesarios para autenticar a un usuario: correo electrónico y contraseña.
 */
public class LoginRequest {

  private String email;
  private String password;

  /**
   * Constructor por defecto.
   */
  public LoginRequest() {}

  /**
   * Obtiene el correo electrónico del usuario.
   *
   * @return el correo electrónico como una cadena de texto
   */
  public String getEmail() {
    return email;
  }

  /**
   * Establece el correo electrónico del usuario.
   *
   * @param email el correo electrónico a establecer
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * Obtiene la contraseña del usuario.
   *
   * @return la contraseña como una cadena de texto
   */
  public String getPassword() {
    return password;
  }

  /**
   * Establece la contraseña del usuario.
   *
   * @param password la contraseña a establecer
   */
  public void setPassword(String password) {
    this.password = password;
  }
}
