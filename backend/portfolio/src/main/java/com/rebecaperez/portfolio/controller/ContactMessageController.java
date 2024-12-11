package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.model.ContactMessage;
import com.rebecaperez.portfolio.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

  private final EmailService emailService;

  public ContactMessageController(EmailService emailService) {
    this.emailService = emailService;
  }

  @PostMapping
  public ResponseEntity<Map<String, String>> sendContactMessage(@RequestBody ContactMessage contactMessage) {
    // Llamar al servicio con los datos del mensaje
    emailService.sendContactMessage(
      contactMessage.getName(),      // Nombre del remitente
      contactMessage.getEmail(),     // Correo del remitente
      contactMessage.getSubject(),   // Asunto del mensaje
      contactMessage.getMessage()    // Cuerpo del mensaje
    );

    // Devuelve una respuesta en formato JSON
    Map<String, String> response = new HashMap<>();
    response.put("message", "Mensaje enviado exitosamente.");
    return ResponseEntity.ok(response);
  }
}
