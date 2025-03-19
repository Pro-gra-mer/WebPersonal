package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la entidad {@link Project}.
 * <p>
 * Este repositorio extiende de {@link JpaRepository} y proporciona operaciones CRUD básicas
 * para la entidad Project, permitiendo la interacción con la base de datos para la gestión de proyectos.
 * </p>
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
