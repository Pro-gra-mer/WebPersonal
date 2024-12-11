package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.model.ContactMessage;
import com.rebecaperez.portfolio.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

  private final EmailService emailService;

  public ContactMessageController(EmailService emailService) {
    this.emailService = emailService;
  }

  @PostMapping
  public ResponseEntity<String> sendContactMessage(@RequestBody ContactMessage contactMessage) {

    // Llamar al servicio con los datos del mensaje
    emailService.sendContactMessage(
      contactMessage.getName(),      // Nombre del remitente
      contactMessage.getEmail(),     // Correo del remitente
      contactMessage.getSubject(),   // Asunto del mensaje
      contactMessage.getMessage()    // Cuerpo del mensaje
    );

    return ResponseEntity.ok("Mensaje enviado exitosamente.");
  }
}
