package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
  @Query("SELECT m FROM Message m JOIN FETCH m.user")
  List<Message> findAllWithUser(); // Carga los mensajes con los datos del usuario
}
