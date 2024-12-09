package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.Message;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.repository.MessageRepository;
import com.rebecaperez.portfolio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

  private final MessageRepository messageRepository;
  private final UserRepository userRepository;

  public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
    this.messageRepository = messageRepository;
    this.userRepository = userRepository;
  }

  public Message saveMessage(String content, String email) {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

    Message message = new Message();
    message.setContent(content);
    message.setUser(user);

    return messageRepository.save(message);
  }

  // Método para obtener todos los mensajes
  public List<Message> getAllMessages() {
    return messageRepository.findAllWithUser();
  }
}
