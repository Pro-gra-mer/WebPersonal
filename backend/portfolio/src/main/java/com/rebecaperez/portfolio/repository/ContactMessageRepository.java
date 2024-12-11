package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
  // Métodos personalizados si los necesitas (puedes agregar más adelante)
}
