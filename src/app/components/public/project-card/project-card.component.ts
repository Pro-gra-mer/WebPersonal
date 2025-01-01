import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateService } from '../../../services/date.service';
import { AuthService } from '../../../services/auth.service';
import { ProjectService } from '../../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  providers: [DateService],
})
export class ProjectCardComponent implements OnInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() publishDate!: Date;
  @Input() link!: string;

  formattedDate: string = '';
  isAdmin: boolean = false;

  @Output() projectDeleted = new EventEmitter<number>();

  confirmingDelete: boolean = false; // Estado de confirmación
  errorMessage: string | null = null; // Mensaje de error para el usuario

  constructor(
    private dateService: DateService,
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.formattedDate = this.dateService.transformDate(
      this.publishDate,
      'es-ES',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );

    this.isAdmin = this.authService.isAdmin();
  }

  confirmDelete(): void {
    this.confirmingDelete = true; // Activar estado de confirmación
  }

  cancelDelete(): void {
    this.confirmingDelete = false; // Cancelar estado de confirmación
  }

  deleteProject(): void {
    this.projectService.deleteProject(this.id).subscribe({
      next: () => {
        this.projectDeleted.emit(this.id); // Emitir ID del proyecto eliminado
      },
      error: (err) => {
        this.errorMessage =
          'Error al eliminar el proyecto. Por favor, intenta nuevamente.';
      },
      complete: () => {
        this.confirmingDelete = false; // Restablecer estado
      },
    });
  }
}
