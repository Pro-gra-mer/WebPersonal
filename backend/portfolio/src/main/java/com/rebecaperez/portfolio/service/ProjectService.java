package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.Project;
import com.rebecaperez.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
  /*
   ProjectService utiliza ProjectRepository para realizar las operaciones CRUD llamando a sus métodos
   como findAll(), findById(), save(), y deleteById() sin necesidad de implementar su lógica.
   Spring se encarga de implementar estos métodos detrás de escenas.
 */

  private final ProjectRepository projectRepository;

  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
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

  public Project createProject(Project project) {
    return projectRepository.save(project);
  }
}

