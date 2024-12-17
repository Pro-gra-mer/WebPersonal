package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.PasswordResetToken;
import com.rebecaperez.portfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

  Optional<PasswordResetToken> findByToken(String token);

  @Modifying
  @Transactional
  @Query("DELETE FROM PasswordResetToken t WHERE t.token = :token")
  void deleteByToken(@Param("token") String token);

  @Modifying
  @Transactional
  @Query("DELETE FROM PasswordResetToken t WHERE t.user = :user")
  void deleteByUser(@Param("user") User user);
}
