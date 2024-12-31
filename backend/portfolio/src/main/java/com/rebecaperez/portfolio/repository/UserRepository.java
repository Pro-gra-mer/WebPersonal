package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  // Método para buscar por email
  Optional<User> findByEmail(String email);

  // Método para buscar por username
  Optional<User> findByUsername(String username);

  // Método para eliminar usuarios no activados después de 24 horas
  @Modifying
  @Query("DELETE FROM User u WHERE u.enabled = false AND u.createdAt < :expirationTime")
  void deleteInactiveUsersBefore(LocalDateTime expirationTime);
}
