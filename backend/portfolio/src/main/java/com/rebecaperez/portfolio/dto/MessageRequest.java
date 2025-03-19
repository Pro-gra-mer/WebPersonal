package com.rebecaperez.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Clase DTO (Data Transfer Object) para representar una solicitud de mensaje.
 * Contiene el contenido del mensaje con validaciones para asegurar que no esté vacío y tenga un tamaño adecuado.
 */
public class MessageRequest {

  @NotBlank(message = "El contenido no puede estar vacío") // Valida que no sea nulo ni vacío
  @Size(max = 500, message = "El contenido no puede superar los 500 caracteres") // Limita la longitud máxima
  private String content;

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
}
