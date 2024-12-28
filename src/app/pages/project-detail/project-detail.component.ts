import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service'; // Importa AuthService
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [ProjectService],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  isAdmin: boolean = false; // Control de visibilidad del botón "Editar"

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private authService: AuthService // Inyecta AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.projectService.getProject(id).subscribe({
        next: (project) => (this.project = project),
        error: (error) => console.error('Error loading project:', error),
      });
    } else {
      console.error('Project ID not found in route parameters');
    }

    // Verifica si el usuario actual es administrador
    this.isAdmin = this.authService.isAdmin();
  }
}
