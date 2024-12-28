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
      // Filtra los tres últimos proyectos
      this.projects = projects.slice(-3).reverse();
    });

    // Inicializa los proyectos si aún no se han cargado
    this.projectService.getProjects().subscribe();
  }
}
