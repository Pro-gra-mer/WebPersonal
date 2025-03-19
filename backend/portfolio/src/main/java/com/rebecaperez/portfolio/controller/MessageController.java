package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.dto.MessageRequest;
import com.rebecaperez.portfolio.dto.MessageResponse;
import com.rebecaperez.portfolio.model.Message;
import com.rebecaperez.portfolio.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador REST para gestionar mensajes.
 * Permite enviar mensajes autenticados y obtener una lista de todos los mensajes.
 */
@RestController
@RequestMapping("/api/messages")
public class MessageController {

  private final MessageService messageService;

  /**
   * Constructor del controlador de mensajes.
   *
   * @param messageService el servicio de mensajes {@link MessageService} para gestionar operaciones
   */
  public MessageController(MessageService messageService) {
    this.messageService = messageService;
  }

  /**
   * Envía un mensaje nuevo desde un usuario autenticado.
   * Guarda el mensaje y devuelve una respuesta con los datos relevantes.
   *
   * @param request el objeto {@link MessageRequest} con el contenido del mensaje, validado con {@link Valid}
   * @param authentication el objeto {@link Authentication} que contiene la información del usuario autenticado
   * @return una respuesta {@link ResponseEntity} con un {@link MessageResponse} que contiene los detalles del mensaje enviado
   */
  @PostMapping
  public ResponseEntity<MessageResponse> sendMessage(@Valid @RequestBody MessageRequest request, Authentication authentication) {
    String email = authentication.getName(); // Usuario autenticado
    Message message = messageService.saveMessage(request.getContent(), email); // Usa el contenido validado del DTO

    // Crear una respuesta DTO para evitar datos sensibles
    MessageResponse response = new MessageResponse(
      message.getId(),
      message.getContent(),
      message.getDate(),
      message.getUser().getUsername(),
      message.getUser().getEmail()
    );

    return ResponseEntity.ok(response);
  }

  /**
   * Obtiene una lista de todos los mensajes almacenados.
   * Convierte los mensajes a un formato de respuesta seguro usando DTOs.
   *
   * @return una respuesta {@link ResponseEntity} con una lista de {@link MessageResponse} que contiene los detalles de los mensajes
   */
  @GetMapping
  public ResponseEntity<List<MessageResponse>> getAllMessages() {
    List<Message> messages = messageService.getAllMessages();

    // Convertir los mensajes a una lista de DTOs
    List<MessageResponse> responses = messages.stream()
      .map(message -> new MessageResponse(
        message.getId(),
        message.getContent(),
        message.getDate(),
        message.getUser().getUsername(),
        message.getUser().getEmail()
      ))
      .collect(Collectors.toList());

    return ResponseEntity.ok(responses);
  }
}
