package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.Project;
import com.rebecaperez.portfolio.repository.ProjectRepository;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

  private final ProjectRepository projectRepository;

  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  // Método para limpiar y sanitizar el contenido HTML. Evita inserciones maliciosas
  private String cleanHtmlContent(String content) {
    // Reemplaza &nbsp; por espacios normales
    content = content.replaceAll("&nbsp;", " ");
    // Limpia el contenido usando Jsoup con una lista segura básica
    return Jsoup.clean(content, Safelist.basic());
  }

  // Crear un proyecto con contenido limpio y sanitizado
  public Project createProject(Project project) {
    // Limpia y sanitiza el contenido antes de guardar
    project.setContent(cleanHtmlContent(project.getContent()));
    return projectRepository.save(project);
  }

  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  public Optional<Project> getProjectById(Long id) {
    return projectRepository.findById(id);
  }

  public void deleteProject(Long id) {
    projectRepository.deleteById(id);
  }
}
