package com.rebecaperez.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contact_messages") // Mapea con la tabla en la base de datos
public class ContactMessage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // Clave primaria autogenerada
  private Long id;

  @Column(nullable = false) // Campo obligatorio
  private String name;

  @Column(nullable = false) // Campo obligatorio
  private String email;

  @Column(nullable = false) // Campo obligatorio
  private String subject;

  @Column(nullable = false, columnDefinition = "TEXT") // Texto largo para el mensaje
  private String message;

  // Constructor vacío (requerido por JPA)
  public ContactMessage() {}

  // Constructor completo (opcional, para facilitar creación de objetos)
  public ContactMessage(String name, String email, String subject, String message) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }

  // Getters y Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSubject() {
    return subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
