package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la entidad {@link ContactMessage}.
 * <p>
 * Este repositorio extiende de {@link JpaRepository} y proporciona métodos CRUD
 * y de consulta para la entidad ContactMessage. Se encarga de la interacción
 * con la base de datos para las operaciones relacionadas con los mensajes de contacto.
 * </p>
 */
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
