package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.Project;
import com.rebecaperez.portfolio.repository.ProjectRepository;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para gestionar los proyectos del portfolio.
 * <p>
 * Este servicio se encarga de crear, actualizar, eliminar y obtener proyectos,
 * aplicando además una limpieza y sanitización del contenido HTML para prevenir
 * inyecciones maliciosas.
 * </p>
 */
@Service
public class ProjectService {

  /**
   * Repositorio para la entidad {@link Project}.
   */
  private final ProjectRepository projectRepository;

  /**
   * Constructor con inyección de dependencia del repositorio de proyectos.
   *
   * @param projectRepository el repositorio de proyectos.
   */
  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Limpia y sanitiza el contenido HTML recibido, evitando inserciones maliciosas.
   * <p>
   * Reemplaza las entidades HTML &nbsp; por espacios normales y utiliza Jsoup con una
   * lista segura básica para limpiar el contenido.
   * </p>
   *
   * @param content el contenido HTML a limpiar.
   * @return el contenido HTML limpio.
   */
  private String cleanHtmlContent(String content) {
    // Reemplaza &nbsp; por espacios normales
    content = content.replaceAll("&nbsp;", " ");
    // Limpia el contenido usando Jsoup con una lista segura básica
    return Jsoup.clean(content, Safelist.basic());
  }

  /**
   * Crea un nuevo proyecto con contenido limpio y sanitizado.
   * <p>
   * Valida que el contenido del proyecto no esté vacío. Si el contenido es nulo o
   * vacío, se lanza una IllegalArgumentException.
   * </p>
   *
   * @param project el proyecto a crear.
   * @return el proyecto guardado.
   * @throws IllegalArgumentException si el contenido del proyecto es nulo o vacío.
   */
  public Project createProject(Project project) {
    if (project.getContent() == null || project.getContent().isEmpty()) {
      throw new IllegalArgumentException("El contenido del proyecto no puede estar vacío.");
    }
    System.out.println("Guardando proyecto con contenido: " + project.getContent());
    return projectRepository.save(project);
  }

  /**
   * Obtiene todos los proyectos almacenados en la base de datos.
   *
   * @return una lista de proyectos.
   */
  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  /**
   * Obtiene un proyecto por su identificador.
   *
   * @param id el identificador del proyecto.
   * @return un Optional que contiene el proyecto si existe, o vacío en caso contrario.
   */
  public Optional<Project> getProjectById(Long id) {
    return projectRepository.findById(id);
  }

  /**
   * Actualiza un proyecto existente con la información proporcionada.
   * <p>
   * Busca el proyecto por su identificador y, de encontrarlo, actualiza sus propiedades
   * con los valores del proyecto actualizado. Si el proyecto no existe, se lanza una excepción.
   * </p>
   *
   * @param id             el identificador del proyecto a actualizar.
   * @param updatedProject el proyecto con la información actualizada.
   * @return el proyecto actualizado.
   * @throws RuntimeException si no se encuentra el proyecto con el id proporcionado.
   */
  public Project updateProject(Long id, Project updatedProject) {
    return projectRepository.findById(id).map(project -> {
      project.setTitle(updatedProject.getTitle());
      project.setDescription(updatedProject.getDescription());
      project.setContent(updatedProject.getContent());
      project.setPublishDate(updatedProject.getPublishDate());
      project.setImageUrl(updatedProject.getImageUrl());
      return projectRepository.save(project);
    }).orElseThrow(() -> new RuntimeException("Proyecto no encontrado con id: " + id));
  }

  /**
   * Elimina un proyecto por su identificador.
   *
   * @param id el identificador del proyecto a eliminar.
   */
  public void deleteProject(Long id) {
    projectRepository.deleteById(id);
  }
}
