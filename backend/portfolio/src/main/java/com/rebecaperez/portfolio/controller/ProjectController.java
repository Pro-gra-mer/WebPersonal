package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.model.Project;
import com.rebecaperez.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*
  ProjectController actúa como el intermediario entre el frontend y el backend. Este controlador maneja
  las solicitudes HTTP del cliente, ejecuta las operaciones correspondientes a través del servicio (ProjectService),
  y devuelve las respuestas adecuadas.
 */

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  @Autowired
  private ProjectService projectService;

  @GetMapping
  public List<Project> getAllProjects() {
    return projectService.getAllProjects();
  }

  @GetMapping("/{id}")
  public Optional<Project> getProjectById(@PathVariable Long id) {
    return projectService.getProjectById(id);
  }

  @PostMapping
  public Project createProject(@RequestBody Project project) {
    return projectService.createProject(project);
  }

  @DeleteMapping("/{id}")
  public void deleteProject(@PathVariable Long id) {
    projectService.deleteProject(id);
  }
}
