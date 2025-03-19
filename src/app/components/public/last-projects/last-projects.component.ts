import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-last-projects',
  standalone: true,
  imports: [RouterLink, CommonModule, ProjectCardComponent],
  templateUrl: './last-projects.component.html',
  styleUrls: ['./last-projects.component.css'],
})
export class LastProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.projects$.subscribe((projects) => {
      // Ordenar por publishDate de forma descendente (más reciente primero)
      this.projects = [...projects]
        .sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
        )
        .slice(0, 3); // Tomar los 3 más recientes
    });

    // Cargar proyectos si aún no se han obtenido
    this.projectService.getProjects().subscribe();
  }
}
