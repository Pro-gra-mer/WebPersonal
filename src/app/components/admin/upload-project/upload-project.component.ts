import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-upload-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css'],
})
export class UploadProjectComponent {
  project: Project = {
    id: 0, // El id puede ser gestionado por el backend al crear el proyecto
    title: '',
    description: '',
    content: '',
    publishDate: new Date(),
    imageUrl: '',
  };

  constructor(private projectService: ProjectService) {}

  onSubmit(): void {
    this.projectService.createProject(this.project).subscribe(
      (response) => {
        console.log('Proyecto subido:', response);

        // Reinicia el formulario después de enviar el proyecto
        this.project = {
          id: 0,
          title: '',
          description: '',
          content: '',
          publishDate: new Date(),
          imageUrl: '',
        };
      },
      (error) => {
        console.error('Error al subir el proyecto:', error);
      }
    );
  }
}
