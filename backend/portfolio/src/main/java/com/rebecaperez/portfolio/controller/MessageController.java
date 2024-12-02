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

@RestController
@RequestMapping("/api/messages")
public class MessageController {

  private final MessageService messageService;

  public MessageController(MessageService messageService) {
    this.messageService = messageService;
  }

  @PostMapping
  public ResponseEntity<MessageResponse> sendMessage(@Valid @RequestBody MessageRequest request, Authentication authentication) {
    String email = authentication.getName(); // Usuario autenticado
    Message message = messageService.saveMessage(request.getContent(), email); // Usa el contenido validado del DTO

    // Crear una respuesta DTO para evitar datos sensibles
    MessageResponse response = new MessageResponse(
      message.getId(),
      message.getContent(),
      message.getDate(),
      message.getUser().getEmail()
    );

    return ResponseEntity.ok(response);
  }

  @GetMapping
  public ResponseEntity<List<MessageResponse>> getAllMessages() {
    List<Message> messages = messageService.getAllMessages();

    // Convertir los mensajes a una lista de DTOs
    List<MessageResponse> responses = messages.stream()
      .map(message -> new MessageResponse(
        message.getId(),
        message.getContent(),
        message.getDate(),
        message.getUser().getEmail()
      ))
      .collect(Collectors.toList());

    return ResponseEntity.ok(responses);
  }
}
