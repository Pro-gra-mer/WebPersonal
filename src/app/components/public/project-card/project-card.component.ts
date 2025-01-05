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

  @Output() projectDeleted = new EventEmitter<number>();

  formattedDate: string = '';
  isAdmin: boolean = false;
  confirmingDelete: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private dateService: DateService,
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Formatea la fecha y verifica el rol del usuario
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
    this.confirmingDelete = true;
  }

  cancelDelete(): void {
    this.confirmingDelete = false;
  }

  deleteProject(): void {
    // Llama al servicio y emite el evento al eliminar el proyecto
    this.projectService.deleteProject(this.id).subscribe({
      next: () => this.projectDeleted.emit(this.id),
      error: () => {
        this.errorMessage =
          'Error al eliminar el proyecto. Intenta nuevamente.';
      },
      complete: () => (this.confirmingDelete = false),
    });
  }
}
