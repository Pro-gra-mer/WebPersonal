package com.rebecaperez.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MessageRequest {

  @NotBlank(message = "El contenido no puede estar vacío") // Valida que no sea nulo ni vacío
  @Size(max = 255, message = "El contenido no puede superar los 255 caracteres") // Limita la longitud máxima
  private String content;

  // Getters y Setters
  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
