import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  @ViewChild('quillEditor', { static: false }) quillEditor: any; // Referencia al editor Quill
  editForm: FormGroup; // Formulario reactivo para edición
  projectId: number | null = null; // ID del proyecto obtenido de la URL
  message: string | null = null; // Mensaje para el usuario

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Configuración inicial del formulario con validaciones
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      content: ['', [Validators.required]], // Contenido enriquecido
      publishDate: [null, Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    // Obtiene el ID del proyecto desde la URL
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.loadProject(this.projectId); // Carga datos si hay un ID válido
    } else {
      this.message = 'Error: No se encontró el ID del proyecto.';
    }
  }

  loadProject(id: number): void {
    // Carga los datos del proyecto desde el servicio
    this.projectService.getProject(id).subscribe({
      next: (project: Project) => {
        // Llena el formulario con los datos recibidos
        this.editForm.patchValue({
          title: project.title,
          description: project.description,
          content: project.content,
          publishDate: project.publishDate,
          imageUrl: project.imageUrl,
        });
      },
      error: () => {
        this.message = 'Error al cargar los datos del proyecto.';
      },
    });
  }

  handleImageUpload() {
    // Manejador para la carga de imágenes en el editor
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const token = this.authService.getToken(); // Token de autenticación
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
    // Configura un manejador personalizado para la opción de cargar imágenes
    const toolbar = quillInstance.getModule('toolbar');
    toolbar.addHandler('image', this.handleImageUpload.bind(this));
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.message = 'Por favor, corrige los errores en el formulario.';
      return;
    }

    // Actualiza el contenido del editor Quill antes de enviar
    const content = this.quillEditor.quillEditor.root.innerHTML;
    this.editForm.patchValue({ content });

    if (this.projectId) {
      // Envía los datos actualizados al servidor
      this.projectService
        .updateProject(this.projectId, this.editForm.value)
        .subscribe({
          next: () => {
            this.message = 'Proyecto actualizado exitosamente.';
            this.router.navigate(['/projects', this.projectId]);
          },
          error: () => {
            this.message = 'Error al actualizar el proyecto.';
          },
        });
    }
  }

  onCancel(): void {
    // Redirige al usuario al inicio u otra página
    this.router.navigate(['/home']);
  }
}
