package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.model.Project;
import com.rebecaperez.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar proyectos.
 * Proporciona endpoints para crear, obtener, actualizar y eliminar proyectos.
 */
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  @Autowired
  private ProjectService projectService;

  /**
   * Crea un nuevo proyecto con los datos recibidos.
   *
   * @param project el objeto {@link Project} con los datos del proyecto a crear
   * @return el proyecto creado {@link Project}
   */
  @PostMapping
  public Project createProject(@RequestBody Project project) {
    System.out.println("Contenido recibido: " + project.getContent());
    return projectService.createProject(project);
  }

  /**
   * Obtiene una lista de todos los proyectos disponibles.
   *
   * @return una lista de objetos {@link Project} con todos los proyectos
   */
  @GetMapping
  public List<Project> getAllProjects() {
    return projectService.getAllProjects();
  }

  /**
   * Obtiene un proyecto específico según su identificador.
   *
   * @param id el identificador único del proyecto
   * @return un {@link Optional} que contiene el proyecto {@link Project} si existe, o vacío si no
   */
  @GetMapping("/{id}")
  public Optional<Project> getProjectById(@PathVariable Long id) {
    return projectService.getProjectById(id);
  }

  /**
   * Actualiza un proyecto existente con los datos proporcionados.
   *
   * @param id el identificador único del proyecto a actualizar
   * @param updatedProject el objeto {@link Project} con los datos actualizados
   * @return el proyecto actualizado {@link Project}
   */
  @PutMapping("/{id}")
  public Project updateProject(@PathVariable Long id, @RequestBody Project updatedProject) {
    return projectService.updateProject(id, updatedProject);
  }

  /**
   * Elimina un proyecto según su identificador.
   *
   * @param id el identificador único del proyecto a eliminar
   */
  @DeleteMapping("/{id}")
  public void deleteProject(@PathVariable Long id) {
    projectService.deleteProject(id);
  }
}
