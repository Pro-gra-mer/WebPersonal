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
    private elRef: ElementRef // Inyectamos ElementRef
  ) {}

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

    this.isAdmin = this.authService.isAdmin();
  }

  ngAfterViewChecked(): void {
    // Ajustar las imágenes dentro de `.card-text` después de que se renderice el contenido
    const images = this.elRef.nativeElement.querySelectorAll('.card-text img');
    images.forEach((img: HTMLImageElement) => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }
}
