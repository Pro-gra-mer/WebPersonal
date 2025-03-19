package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.ContactMessage;
import com.rebecaperez.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio para gestionar los mensajes de contacto.
 * <p>
 * Este servicio encapsula la lógica de negocio relacionada con los mensajes de contacto,
 * permitiendo guardarlos, consultarlos y eliminarlos utilizando el repositorio correspondiente.
 * </p>
 */
@Service
public class ContactMessageService {

  /**
   * Repositorio para la entidad {@link ContactMessage}.
   */
  private final ContactMessageRepository contactMessageRepository;

  /**
   * Inyección de dependencia a través del constructor.
   *
   * @param contactMessageRepository el repositorio de mensajes de contacto.
   */
  public ContactMessageService(ContactMessageRepository contactMessageRepository) {
    this.contactMessageRepository = contactMessageRepository;
  }

  /**
   * Guarda un mensaje de contacto en la base de datos.
   *
   * @param contactMessage el mensaje de contacto a guardar.
   * @return el mensaje de contacto guardado.
   */
  public ContactMessage saveMessage(ContactMessage contactMessage) {
    return contactMessageRepository.save(contactMessage);
  }

  /**
   * Obtiene todos los mensajes de contacto almacenados.
   *
   * @return una lista con todos los mensajes de contacto.
   */
  public List<ContactMessage> getAllMessages() {
    return contactMessageRepository.findAll();
  }

  /**
   * Obtiene un mensaje de contacto por su ID.
   *
   * @param id el identificador del mensaje.
   * @return el mensaje de contacto encontrado.
   * @throws RuntimeException si no se encuentra el mensaje con el ID especificado.
   */
  public ContactMessage getMessageById(Long id) {
    return contactMessageRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con ID: " + id));
  }

  /**
   * Elimina un mensaje de contacto por su ID.
   *
   * @param id el identificador del mensaje a eliminar.
   * @throws RuntimeException si no existe un mensaje con el ID proporcionado.
   */
  public void deleteMessageById(Long id) {
    if (!contactMessageRepository.existsById(id)) {
      throw new RuntimeException("No se puede eliminar. Mensaje no encontrado con ID: " + id);
    }
    contactMessageRepository.deleteById(id);
  }
}
