package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Repositorio para la entidad {@link Message}.
 * <p>
 * Este repositorio extiende de {@link JpaRepository} y proporciona operaciones CRUD
 * básicas, además de consultas personalizadas para la entidad Message.
 * </p>
 */
public interface MessageRepository extends JpaRepository<Message, Long> {

  /**
   * Obtiene todos los mensajes junto con los datos del usuario asociado.
   * <p>
   * Se utiliza la consulta con JOIN FETCH para cargar de forma inmediata los datos del usuario,
   * evitando problemas de carga diferida (Lazy Loading).
   * </p>
   *
   * @return una lista de mensajes con la información del usuario cargada.
   */
  @Query("SELECT m FROM Message m JOIN FETCH m.user")
  List<Message> findAllWithUser(); // Carga los mensajes con los datos del usuario
}
