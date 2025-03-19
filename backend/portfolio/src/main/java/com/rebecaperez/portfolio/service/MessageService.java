package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.Message;
import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.repository.MessageRepository;
import com.rebecaperez.portfolio.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio para gestionar los mensajes en el portfolio.
 * <p>
 * Este servicio se encarga de las operaciones relacionadas con los mensajes,
 * como guardar un mensaje asociado a un usuario y obtener todos los mensajes,
 * utilizando los repositorios correspondientes.
 * </p>
 */
@Service
public class MessageService {

  /**
   * Repositorio para la entidad {@link Message}.
   */
  private final MessageRepository messageRepository;

  /**
   * Repositorio para la entidad {@link User}.
   */
  private final UserRepository userRepository;

  /**
   * Constructor con inyección de dependencias de los repositorios de mensajes y usuarios.
   *
   * @param messageRepository el repositorio de mensajes.
   * @param userRepository    el repositorio de usuarios.
   */
  public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
    this.messageRepository = messageRepository;
    this.userRepository = userRepository;
  }

  /**
   * Guarda un mensaje asociado a un usuario identificado por su correo electrónico.
   * <p>
   * Primero, se busca el usuario por correo; si no se encuentra, se lanza una excepción.
   * Luego, se crea un objeto Message, se le asigna el contenido y el usuario, y se guarda en la base de datos.
   * </p>
   *
   * @param content el contenido del mensaje.
   * @param email   el correo electrónico del usuario que envía el mensaje.
   * @return el mensaje guardado.
   * @throws IllegalArgumentException si no se encuentra el usuario con el correo proporcionado.
   */
  public Message saveMessage(String content, String email) {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

    Message message = new Message();
    message.setContent(content);
    message.setUser(user);

    return messageRepository.save(message);
  }

  /**
   * Obtiene todos los mensajes almacenados en la base de datos.
   * <p>
   * Se utiliza una consulta optimizada con JOIN FETCH para cargar los datos del usuario
   * asociado a cada mensaje, evitando problemas de carga diferida (Lazy Loading).
   * </p>
   *
   * @return una lista de mensajes con la información del usuario cargada.
   */
  public List<Message> getAllMessages() {
    List<Message> messages = messageRepository.findAllWithUser();
    return messages;
  }
}
