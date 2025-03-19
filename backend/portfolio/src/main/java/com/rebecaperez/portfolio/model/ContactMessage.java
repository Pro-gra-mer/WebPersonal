package com.rebecaperez.portfolio.model;

import jakarta.persistence.*;

/**
 * Representa un mensaje de contacto enviado a través del portfolio.
 * <p>
 * Esta entidad se mapea con la tabla <i>contact_messages</i> en la base de datos y contiene
 * información del remitente, como nombre, correo electrónico, asunto y el contenido del mensaje.
 * </p>
 */
@Entity
@Table(name = "contact_messages") // Mapea con la tabla en la base de datos
public class ContactMessage {

  /**
   * Identificador único del mensaje.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // Clave primaria autogenerada
  private Long id;

  /**
   * Nombre del remitente del mensaje.
   */
  @Column(nullable = false) // Campo obligatorio
  private String name;

  /**
   * Correo electrónico del remitente.
   */
  @Column(nullable = false) // Campo obligatorio
  private String email;

  /**
   * Asunto del mensaje.
   */
  @Column(nullable = false) // Campo obligatorio
  private String subject;

  /**
   * Contenido del mensaje.
   * <p>
   * Se utiliza la definición de columna "TEXT" para permitir almacenar un texto largo.
   * </p>
   */
  @Column(nullable = false, columnDefinition = "TEXT") // Texto largo para el mensaje
  private String message;

  /**
   * Constructor vacío requerido por JPA.
   */
  public ContactMessage() {}

  /**
   * Constructor completo para facilitar la creación de objetos ContactMessage.
   *
   * @param name    el nombre del remitente.
   * @param email   el correo electrónico del remitente.
   * @param subject el asunto del mensaje.
   * @param message el contenido del mensaje.
   */
  public ContactMessage(String name, String email, String subject, String message) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }

  /**
   * Obtiene el identificador único del mensaje.
   *
   * @return el ID del mensaje.
   */
  public Long getId() {
    return id;
  }

  /**
   * Establece el identificador único del mensaje.
   *
   * @param id el ID a asignar.
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Obtiene el nombre del remitente.
   *
   * @return el nombre del remitente.
   */
  public String getName() {
    return name;
  }

  /**
   * Establece el nombre del remitente.
   *
   * @param name el nombre a asignar.
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Obtiene el correo electrónico del remitente.
   *
   * @return el correo electrónico.
   */
  public String getEmail() {
    return email;
  }

  /**
   * Establece el correo electrónico del remitente.
   *
   * @param email el correo a asignar.
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * Obtiene el asunto del mensaje.
   *
   * @return el asunto.
   */
  public String getSubject() {
    return subject;
  }

  /**
   * Establece el asunto del mensaje.
   *
   * @param subject el asunto a asignar.
   */
  public void setSubject(String subject) {
    this.subject = subject;
  }

  /**
   * Obtiene el contenido del mensaje.
   *
   * @return el contenido del mensaje.
   */
  public String getMessage() {
    return message;
  }

  /**
   * Establece el contenido del mensaje.
   *
   * @param message el contenido a asignar.
   */
  public void setMessage(String message) {
    this.message = message;
  }
}
