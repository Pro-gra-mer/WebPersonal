package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  // Método para buscar por email
  Optional<User> findByEmail(String email);

  // Método para buscar por username
  Optional<User> findByUsername(String username);
}
