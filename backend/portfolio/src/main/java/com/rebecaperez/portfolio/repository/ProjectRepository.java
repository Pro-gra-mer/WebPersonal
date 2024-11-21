package com.rebecaperez.portfolio.repository;

import com.rebecaperez.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
/*
  la interfaz ProjectRepository no necesitas escribir nada. Esa interfaz hereda de JpaRepository de Spring Data JPA,
  lo que le proporciona automáticamente todas las operaciones CRUD básicas. ProjectService la uriliza
 */
