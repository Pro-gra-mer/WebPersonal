import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
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
export class ProjectDetailComponent implements OnInit, AfterViewChecked {
  project: Project | null = null;
  isAdmin: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private elRef: ElementRef
  ) {}

  // Se inicializa el componente: se obtiene el ID del proyecto y se carga su información
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.projectService.getProject(id).subscribe({
        next: (project) => (this.project = project),
        error: () => {
          this.errorMessage =
            'Error al cargar el proyecto. Por favor, intenta nuevamente.';
        },
      });
    } else {
      this.errorMessage =
        'No se encontró el ID del proyecto en los parámetros de la ruta.';
    }

    /* Comprueba si el usuario es administrador para determinar si se deben mostrar funcionalidades o controles 
    especiales (como editar o eliminar un proyecto) que solo deben estar disponibles para la administradora */
    this.isAdmin = this.authService.isAdmin();
  }

  // Ajusta el tamaño de las imágenes dentro de '.card-text' después de renderizar la vista
  ngAfterViewChecked(): void {
    const images = this.elRef.nativeElement.querySelectorAll('.card-text img');
    images.forEach((img: HTMLImageElement) => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }
}
