package com.rebecaperez.portfolio.dto;

import java.time.LocalDateTime;

/**
 * Clase DTO (Data Transfer Object) para representar la respuesta de un mensaje.
 * Contiene los detalles del mensaje enviados al cliente, como ID, contenido, fecha, nombre de usuario y correo del remitente.
 */
public class MessageResponse {

  private Long id;
  private String content;
  private LocalDateTime date;
  private String username;
  private String senderEmail;

  /**
   * Constructor para inicializar un objeto de respuesta de mensaje con sus propiedades.
   *
   * @param id el identificador único del mensaje
   * @param content el contenido del mensaje
   * @param date la fecha y hora de creación del mensaje
   * @param username el nombre de usuario del remitente
   * @param senderEmail el correo electrónico del remitente
   */
  public MessageResponse(Long id, String content, LocalDateTime date, String username, String senderEmail) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.username = username;
    this.senderEmail = senderEmail;
  }

  /**
   * Obtiene el identificador único del mensaje.
   *
   * @return el ID del mensaje como un {@link Long}
   */
  public Long getId() {
    return id;
  }

  /**
   * Establece el identificador único del mensaje.
   *
   * @param id el ID del mensaje a establecer
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Obtiene el contenido del mensaje.
   *
   * @return el contenido del mensaje como una cadena de texto
   */
  public String getContent() {
    return content;
  }

  /**
   * Establece el contenido del mensaje.
   *
   * @param content el contenido del mensaje a establecer
   */
  public void setContent(String content) {
    this.content = content;
  }

  /**
   * Obtiene la fecha y hora de creación del mensaje.
   *
   * @return la fecha y hora como un {@link LocalDateTime}
   */
  public LocalDateTime getDate() {
    return date;
  }

  /**
   * Establece la fecha y hora de creación del mensaje.
   *
   * @param date la fecha y hora a establecer
   */
  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  /**
   * Obtiene el nombre de usuario del remitente del mensaje.
   *
   * @return el nombre de usuario como una cadena de texto
   */
  public String getUsername() {
    return username;
  }

  /**
   * Establece el nombre de usuario del remitente del mensaje.
   *
   * @param username el nombre de usuario a establecer
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * Obtiene el correo electrónico del remitente del mensaje.
   *
   * @return el correo electrónico como una cadena de texto
   */
  public String getSenderEmail() {
    return senderEmail;
  }

  /**
   * Establece el correo electrónico del remitente del mensaje.
   *
   * @param senderEmail el correo electrónico a establecer
   */
  public void setSenderEmail(String senderEmail) {
    this.senderEmail = senderEmail;
  }
}
