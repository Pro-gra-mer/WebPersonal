import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-project',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css'],
})
export class UploadProjectComponent {
  projectForm: FormGroup;
  message: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      content: ['', [Validators.required]],
      publishDate: [new Date(), Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.message = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.projectService.createProject(this.projectForm.value).subscribe({
      next: () => {
        this.message = 'Proyecto subido exitosamente.';
        this.projectForm.reset();
      },
      error: (error) => {
        this.message = 'Error al subir el proyecto: ' + error.message;
      },
    });
  }
}
