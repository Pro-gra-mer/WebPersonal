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
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }
}
