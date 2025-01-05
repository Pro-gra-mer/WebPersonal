import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'; // Editor de texto enriquecido
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-upload-project',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, QuillModule], // Configuración del módulo
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css'],
})
export class UploadProjectComponent {
  projectForm: FormGroup; // Formulario para los datos del proyecto
  message: string | null = null; // Mensaje para notificar al usuario
  @ViewChild('quillEditor', { static: false }) quillEditor: any; // Referencia al editor Quill

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Inicializa el formulario con validaciones
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      content: ['', [Validators.required]], // Contenido del editor
      publishDate: [new Date(), Validators.required], // Fecha predeterminada actual
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]], // URL de la imagen
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.message = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    // Actualiza el contenido con el texto del editor Quill
    const content = this.quillEditor.quillEditor.root.innerHTML;
    this.projectForm.patchValue({ content });

    // Enviar los datos al servicio para crear un proyecto
    this.projectService.createProject(this.projectForm.value).subscribe({
      next: () => {
        this.message = 'Proyecto subido exitosamente.';
        this.projectForm.reset(); // Limpia el formulario tras el éxito
      },
      error: (error) => {
        this.message = 'Error al subir el proyecto: ' + error.message;
      },
    });
  }

  handleImageUpload() {
    // Manejador de subida de imágenes desde el editor
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const token = this.authService.getToken(); // Verifica el token de autenticación
        if (!token) {
          this.message = 'Error: No estás autenticado.';
          return;
        }

        this.http
          .post('http://localhost:8080/api/images/upload', formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .subscribe({
            next: (response: any) => {
              const imageUrl = `http://localhost:8080${response.imageUrl}`;

              // Inserta la imagen en el editor Quill
              const range = this.quillEditor.quillEditor.getSelection();
              if (range) {
                this.quillEditor.quillEditor.insertEmbed(
                  range.index,
                  'image',
                  imageUrl
                );
                this.quillEditor.quillEditor.setSelection(range.index + 1); // Posiciona el cursor
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
    // Vincula el manejador para la opción de subir imágenes
    const toolbar = quillInstance.getModule('toolbar');
    toolbar.addHandler('image', this.handleImageUpload.bind(this));
  }
}
