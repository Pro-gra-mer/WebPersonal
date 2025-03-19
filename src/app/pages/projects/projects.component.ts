import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/public/project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  // Al iniciar el componente, se recuperan y ordenan los proyectos por fecha de publicación (descendente)
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = [...data].sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    });
  }

  // Elimina el proyecto de la lista cuando se ha eliminado en otro componente
  onProjectDeleted(deletedId: number): void {
    this.projects = this.projects.filter((project) => project.id !== deletedId);
  }
}
