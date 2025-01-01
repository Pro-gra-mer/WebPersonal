import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'; // Importa el módulo de Quill
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-upload-project',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, QuillModule], // Incluye QuillModule
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css'],
})
export class UploadProjectComponent {
  projectForm: FormGroup;
  message: string | null = null;
  @ViewChild('quillEditor', { static: false }) quillEditor: any;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      content: ['', [Validators.required]], // Campo para Quill
      publishDate: [new Date(), Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]], // URL fuera del contenido de Quill
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.message = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    // Obtén el contenido del editor Quill
    const content = this.quillEditor.quillEditor.root.innerHTML;
    this.projectForm.patchValue({ content });

    // Enviar el formulario al backend
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

  handleImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const token = this.authService.getToken(); // Obtén el token desde AuthService
        if (!token) {
          this.message = 'Error: No estás autenticado.';
          return;
        }

        this.http
          .post('http://localhost:8080/api/images/upload', formData, {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token al encabezado
            },
          })
          .subscribe({
            next: (response: any) => {
              const imageUrl = `http://localhost:8080${response.imageUrl}`;

              // Inserta la imagen en el contenido del editor
              const range = this.quillEditor.quillEditor.getSelection();
              if (range) {
                this.quillEditor.quillEditor.insertEmbed(
                  range.index,
                  'image',
                  imageUrl
                );
                // Mueve el cursor después de la imagen
                this.quillEditor.quillEditor.setSelection(range.index + 1);
              }
              this.message = 'Imagen subida exitosamente.';
            },
            error: (err) => {
              this.message = `Error al subir la imagen: ${
                err.status === 401 ? 'No autorizado.' : err.message
              }`;
            },
          });
      } else {
        this.message = 'No se seleccionó ningún archivo.';
      }
    };
    input.click();
  }

  onEditorCreated(quillInstance: any) {
    const toolbar = quillInstance.getModule('toolbar'); // Obtén el módulo de toolbar
    toolbar.addHandler('image', this.handleImageUpload.bind(this)); // Vincula el manejador
  }
}
