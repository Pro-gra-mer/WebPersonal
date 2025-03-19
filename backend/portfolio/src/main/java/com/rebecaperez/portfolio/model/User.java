package com.rebecaperez.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Representa un usuario del sistema.
 * <p>
 * Esta entidad se mapea con la tabla <i>users</i> en la base de datos y contiene
 * información relacionada con la cuenta del usuario, como nombre de usuario, correo,
 * contraseña, rol, estado de activación y la fecha de creación. Además, se establece
 * una relación one-to-many con los mensajes enviados por el usuario.
 * </p>
 */
@Entity
@Table(name = "users")  // Especifica que la tabla se llamará 'users'
public class User {

  /**
   * Identificador único del usuario.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Nombre de usuario.
   */
  private String username;

  /**
   * Correo electrónico del usuario.
   */
  private String email;

  /**
   * Contraseña del usuario.
   */
  private String password;

  /**
   * Rol asignado al usuario (por ejemplo, "admin" o "user").
   */
  private String role;

  /**
   * Indica si la cuenta del usuario está habilitada.
   */
  @Column(nullable = false)
  private boolean enabled = false;

  /**
   * Fecha y hora en que se creó el usuario.
   * <p>
   * Se asigna automáticamente antes de persistir la entidad.
   * </p>
   */
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  /**
   * Lista de mensajes enviados por el usuario.
   * <p>
   * Se establece una relación one-to-many con la entidad Message.
   * </p>
   */
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Message> messages = new ArrayList<>();

  /**
   * Método que se ejecuta automáticamente antes de persistir el usuario,
   * asignando la fecha y hora actual a {@code createdAt}.
   */
  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }

  /**
   * Obtiene el identificador único del usuario.
   *
   * @return el ID del usuario.
   */
  public Long getId() {
    return id;
  }

  /**
   * Establece el identificador único del usuario.
   *
   * @param id el ID a asignar.
   */
  public void setId(Long id) {
    this.id = id;
  }

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
   * @param username el nombre de usuario a asignar.
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * Obtiene el correo electrónico del usuario.
   *
   * @return el correo electrónico.
   */
  public String getEmail() {
    return email;
  }

  /**
   * Establece el correo electrónico del usuario.
   *
   * @param email el correo electrónico a asignar.
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * Obtiene la contraseña del usuario.
   *
   * @return la contraseña.
   */
  public String getPassword() {
    return password;
  }

  /**
   * Establece la contraseña del usuario.
   *
   * @param password la contraseña a asignar.
   */
  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * Obtiene el rol del usuario.
   *
   * @return el rol.
   */
  public String getRole() {
    return role;
  }

  /**
   * Establece el rol del usuario.
   *
   * @param role el rol a asignar.
   */
  public void setRole(String role) {
    this.role = role;
  }

  /**
   * Verifica si la cuenta del usuario está habilitada.
   *
   * @return {@code true} si está habilitada; {@code false} en caso contrario.
   */
  public boolean isEnabled() {
    return enabled;
  }

  /**
   * Establece el estado de habilitación de la cuenta del usuario.
   *
   * @param enabled {@code true} para habilitar; {@code false} para deshabilitar.
   */
  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  /**
   * Obtiene la fecha y hora en que se creó el usuario.
   *
   * @return la fecha de creación.
   */
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  /**
   * Establece la fecha y hora en que se creó el usuario.
   *
   * @param createdAt la fecha a asignar.
   */
  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  /**
   * Obtiene la lista de mensajes enviados por el usuario.
   *
   * @return una lista de mensajes.
   */
  public List<Message> getMessages() {
    return messages;
  }

  /**
   * Establece la lista de mensajes enviados por el usuario.
   *
   * @param messages la lista de mensajes a asignar.
   */
  public void setMessages(List<Message> messages) {
    this.messages = messages;
  }
}
