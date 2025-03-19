package com.rebecaperez.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Representa un mensaje publicado en el portfolio.
 * <p>
 * Esta entidad se mapea con la tabla <i>messages</i> en la base de datos y almacena
 * el contenido del mensaje, la fecha en que fue creado y el usuario que lo publicó.
 * </p>
 */
@Entity
@Table(name = "messages") // Nombre de la tabla en la base de datos
public class Message {

  /**
   * Identificador único del mensaje.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // Clave primaria con autoincremento
  private Long id;

  /**
   * Contenido del mensaje.
   */
  @Column(nullable = false) // El contenido es obligatorio
  private String content;

  /**
   * Fecha en que se creó el mensaje.
   */
  @Column(name = "date", nullable = false) // Mapea el campo "date"
  private LocalDateTime date;

  /**
   * Usuario que publicó el mensaje.
   * <p>
   * Se establece una relación muchos a uno con la entidad User, indicando que un usuario
   * puede tener múltiples mensajes.
   * </p>
   */
  @ManyToOne(fetch = FetchType.LAZY) // Relación muchos a uno con la tabla de usuarios
  @JoinColumn(name = "user_id", nullable = false) // Mapea el campo "user_id"
  private User user;

  /**
   * Constructor por defecto.
   * <p>
   * Inicializa la fecha del mensaje con la fecha y hora actuales.
   * </p>
   */
  public Message() {
    this.date = LocalDateTime.now(); // Fecha actual por defecto
  }

  /**
   * Obtiene el identificador del mensaje.
   *
   * @return el ID del mensaje.
   */
  public Long getId() {
    return id;
  }

  /**
   * Establece el identificador del mensaje.
   *
   * @param id el ID a asignar.
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Obtiene el contenido del mensaje.
   *
   * @return el contenido del mensaje.
   */
  public String getContent() {
    return content;
  }

  /**
   * Establece el contenido del mensaje.
   *
   * @param content el contenido a asignar.
   */
  public void setContent(String content) {
    this.content = content;
  }

  /**
   * Obtiene la fecha de creación del mensaje.
   *
   * @return la fecha en que se creó el mensaje.
   */
  public LocalDateTime getDate() {
    return date;
  }

  /**
   * Establece la fecha de creación del mensaje.
   *
   * @param date la fecha a asignar.
   */
  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  /**
   * Obtiene el usuario asociado al mensaje.
   *
   * @return el usuario que publicó el mensaje.
   */
  public User getUser() {
    return user;
  }

  /**
   * Establece el usuario asociado al mensaje.
   *
   * @param user el usuario a asignar.
   */
  public void setUser(User user) {
    this.user = user;
  }
}
