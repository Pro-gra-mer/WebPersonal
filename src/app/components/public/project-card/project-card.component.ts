import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateService } from '../../../services/date.service'; // Importa DateService
import { AuthService } from '../../../services/auth.service'; // Importa AuthService
import { ProjectService } from '../../../services/project.service'; // Importa ProjectService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  providers: [DateService], // Añade DateService a providers
})
export class ProjectCardComponent implements OnInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() publishDate!: Date; // Fecha de publicación
  @Input() link!: string;

  formattedDate: string = ''; // Propiedad para almacenar la fecha formateada
  isAdmin: boolean = false; // Variable para controlar si el usuario es admin

  constructor(
    private dateService: DateService,
    private authService: AuthService, // Inyectamos el servicio de autenticación
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Usa DateService para formatear publishDate
    this.formattedDate = this.dateService.transformDate(
      this.publishDate,
      'es-ES',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );

    // Verifica si el usuario es admin
    this.isAdmin = this.authService.isAdmin(); // Usamos el método isAdmin del AuthService
  }

  // Función para eliminar el proyecto
  deleteProject(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.projectService.deleteProject(this.id).subscribe(
        () => {
          alert('Proyecto eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el proyecto', error);
          alert('Error al eliminar el proyecto');
        }
      );
    }
  }
}
