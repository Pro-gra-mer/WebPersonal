package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repositorio para la entidad {@link User}.
 * <p>
 * Este repositorio extiende de {@link JpaRepository} y proporciona operaciones CRUD básicas
 * para la entidad User, además de métodos personalizados para búsquedas y eliminaciones.
 * </p>
 */
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * Busca un usuario por su correo electrónico.
   *
   * @param email el correo electrónico del usuario a buscar.
   * @return un {@link Optional} que contiene el usuario si se encuentra, o vacío en caso contrario.
   */
  Optional<User> findByEmail(String email);

  /**
   * Busca un usuario por su nombre de usuario.
   *
   * @param username el nombre de usuario a buscar.
   * @return un {@link Optional} que contiene el usuario si se encuentra, o vacío en caso contrario.
   */
  Optional<User> findByUsername(String username);

  /**
   * Elimina los usuarios que no están activados y cuya fecha de creación es anterior a la fecha especificada.
   * <p>
   * Este método es útil para limpiar los registros de usuarios que no han activado su cuenta en un periodo determinado.
   * </p>
   *
   * @param expirationTime la fecha límite; se eliminarán los usuarios creados antes de esta fecha.
   */
  @Modifying
  @Query("DELETE FROM User u WHERE u.enabled = false AND u.createdAt < :expirationTime")
  void deleteInactiveUsersBefore(LocalDateTime expirationTime);
}
