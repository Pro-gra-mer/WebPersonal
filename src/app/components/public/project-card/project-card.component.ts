import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateService } from '../../../services/date.service';
import { AuthService } from '../../../services/auth.service';
import { ProjectService } from '../../../services/project.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs'; // Importamos firstValueFrom

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

  // Función para eliminar el proyecto usando firstValueFrom
  async deleteProject(event: Event): Promise<void> {
    event.stopPropagation(); // Detiene la propagación del clic al contenedor
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        await firstValueFrom(this.projectService.deleteProject(this.id));
        alert('Proyecto eliminado correctamente');
        // Redirigir a una ruta temporal y luego a /projects
        this.projectDeleted.emit(this.id); // Emitimos el ID del proyecto eliminado
      } catch (error) {
        console.error('Error al eliminar el proyecto', error);
        alert('Error al eliminar el proyecto');
      }
    }
  }
}
