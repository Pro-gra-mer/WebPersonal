package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.model.ContactMessage;
import com.rebecaperez.portfolio.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST para gestionar mensajes de contacto.
 * Permite enviar mensajes de contacto a través de una solicitud POST.
 */
@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

  private final EmailService emailService;

  /**
   * Constructor del controlador de mensajes de contacto.
   *
   * @param emailService el servicio de correo {@link EmailService} para enviar mensajes
   */
  public ContactMessageController(EmailService emailService) {
    this.emailService = emailService;
  }

  /**
   * Envía un mensaje de contacto utilizando los datos proporcionados.
   * Llama al servicio de correo para procesar el mensaje y devuelve una confirmación.
   *
   * @param contactMessage el objeto {@link ContactMessage} con los datos del mensaje (nombre, email, asunto, mensaje)
   * @return una respuesta {@link ResponseEntity} con un mensaje de éxito en formato JSON
   */
  @PostMapping
  public ResponseEntity<Map<String, String>> sendContactMessage(@RequestBody ContactMessage contactMessage) {
    // Llamar al servicio con los datos del mensaje
    emailService.sendContactMessage(
      contactMessage.getName(),
      contactMessage.getEmail(),
      contactMessage.getSubject(),
      contactMessage.getMessage()
    );

    // Devuelve una respuesta en formato JSON
    Map<String, String> response = new HashMap<>();
    response.put("message", "Mensaje enviado exitosamente.");
    return ResponseEntity.ok(response);
  }
}
