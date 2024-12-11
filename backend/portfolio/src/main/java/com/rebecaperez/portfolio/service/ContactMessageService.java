package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.ContactMessage;
import com.rebecaperez.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

  private final ContactMessageRepository contactMessageRepository;

  // Inyección de dependencia a través del constructor
  public ContactMessageService(ContactMessageRepository contactMessageRepository) {
    this.contactMessageRepository = contactMessageRepository;
  }

  // Guardar un mensaje de contacto
  public ContactMessage saveMessage(ContactMessage contactMessage) {
    return contactMessageRepository.save(contactMessage);
  }

  // Obtener todos los mensajes de contacto
  public List<ContactMessage> getAllMessages() {
    return contactMessageRepository.findAll();
  }

  // Obtener un mensaje por ID
  public ContactMessage getMessageById(Long id) {
    return contactMessageRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con ID: " + id));
  }

  // Eliminar un mensaje por ID
  public void deleteMessageById(Long id) {
    if (!contactMessageRepository.existsById(id)) {
      throw new RuntimeException("No se puede eliminar. Mensaje no encontrado con ID: " + id);
    }
    contactMessageRepository.deleteById(id);
  }
}
