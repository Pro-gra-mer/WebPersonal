package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.PasswordResetToken;
import com.rebecaperez.portfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Repositorio para la entidad {@link PasswordResetToken}.
 * <p>
 * Este repositorio extiende de {@link JpaRepository} y proporciona métodos para gestionar los tokens
 * de restablecimiento de contraseña, incluyendo búsquedas y eliminaciones basadas en el token o el usuario.
 * </p>
 */
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

  /**
   * Busca un token de restablecimiento por su valor.
   *
   * @param token el token a buscar.
   * @return un {@link Optional} que contiene el token si se encuentra, o vacío si no.
   */
  Optional<PasswordResetToken> findByToken(String token);

  /**
   * Elimina un token específico de restablecimiento.
   * <p>
   * Esta operación es modificadora y se ejecuta dentro de una transacción.
   * </p>
   *
   * @param token el token que se desea eliminar.
   */
  @Modifying
  @Transactional
  @Query("DELETE FROM PasswordResetToken t WHERE t.token = :token")
  void deleteByToken(@Param("token") String token);

  /**
   * Elimina todos los tokens de restablecimiento asociados a un usuario.
   * <p>
   * Esta operación es modificadora y se ejecuta dentro de una transacción.
   * </p>
   *
   * @param user el usuario cuyos tokens serán eliminados.
   */
  @Modifying
  @Transactional
  @Query("DELETE FROM PasswordResetToken t WHERE t.user = :user")
  void deleteByUser(@Param("user") User user);
}
