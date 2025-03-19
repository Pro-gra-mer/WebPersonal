package com.rebecaperez.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Representa un token para restablecer la contraseña de un usuario.
 * <p>
 * Esta entidad se mapea con la tabla <i>password_reset_tokens</i> y almacena
 * el token único, el usuario asociado y la fecha de expiración del token.
 * </p>
 */
@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {

  /**
   * Identificador único del token.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Usuario asociado al token.
   * <p>
   * Se establece una relación many-to-one con la entidad User y se carga de forma perezosa.
   * </p>
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  /**
   * Token único para restablecer la contraseña.
   */
  @Column(nullable = false, unique = true)
  private String token;

  /**
   * Fecha y hora de expiración del token.
   */
  @Column(nullable = false)
  private LocalDateTime expirationTime;

  /**
   * Constructor por defecto.
   */
  public PasswordResetToken() {}

  /**
   * Obtiene el identificador único del token.
   *
   * @return el ID del token.
   */
  public Long getId() {
    return id;
  }

  /**
   * Establece el identificador único del token.
   *
   * @param id el ID a asignar.
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Obtiene el usuario asociado al token.
   *
   * @return el usuario.
   */
  public User getUser() {
    return user;
  }

  /**
   * Establece el usuario asociado al token.
   *
   * @param user el usuario a asignar.
   */
  public void setUser(User user) {
    this.user = user;
  }

  /**
   * Obtiene el token único para restablecer la contraseña.
   *
   * @return el token.
   */
  public String getToken() {
    return token;
  }

  /**
   * Establece el token único para restablecer la contraseña.
   *
   * @param token el token a asignar.
   */
  public void setToken(String token) {
    this.token = token;
  }

  /**
   * Obtiene la fecha y hora de expiración del token.
   *
   * @return la fecha y hora de expiración.
   */
  public LocalDateTime getExpirationTime() {
    return expirationTime;
  }

  /**
   * Establece la fecha y hora de expiración del token.
   *
   * @param expirationTime la fecha y hora de expiración a asignar.
   */
  public void setExpirationTime(LocalDateTime expirationTime) {
    this.expirationTime = expirationTime;
  }
}
