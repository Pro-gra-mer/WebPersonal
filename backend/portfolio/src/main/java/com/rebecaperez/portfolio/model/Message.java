package com.rebecaperez.portfolio.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages") // Nombre de la tabla en la base de datos
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // Clave primaria con autoincremento
  private Long id;

  @Column(nullable = false) // El contenido es obligatorio
  private String content;

  @Column(name = "date", nullable = false) // Mapea el campo "date"
  private LocalDateTime date;

  @ManyToOne(fetch = FetchType.LAZY) // Relación muchos a uno con la tabla de usuarios
  @JoinColumn(name = "user_id", nullable = false) // Mapea el campo "user_id"
  private User user; // Usuario asociado al mensaje

  public Message() {
    this.date = LocalDateTime.now(); // Fecha actual por defecto
  }

  // Getters y Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public LocalDateTime getDate() {
    return date;
  }

  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
