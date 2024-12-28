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
  @ViewChild('quillEditor', { static: false }) quillEditor: any;
  editForm: FormGroup;
  projectId: number | null = null;
  message: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      content: ['', [Validators.required]], // Para el editor Quill
      publishDate: [null, Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]], // Imagen de portada
    });
  }

  ngOnInit(): void {
    // Obtén el ID del proyecto desde la URL
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.loadProject(this.projectId);
    } else {
      this.message = 'Error: No se encontró el ID del proyecto.';
    }
  }

  loadProject(id: number): void {
    this.projectService.getProject(id).subscribe({
      next: (project: Project) => {
        // Rellena el formulario con los datos del proyecto
        this.editForm.patchValue({
          title: project.title,
          description: project.description,
          content: project.content,
          publishDate: project.publishDate,
          imageUrl: project.imageUrl,
        });
      },
      error: (err) => {
        console.error('Error al cargar el proyecto:', err);
        this.message = 'Error al cargar los datos del proyecto.';
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
          console.error('No estás autenticado. Por favor, inicia sesión.');
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
              console.log('Imagen subida correctamente:', imageUrl);

              // Inserta la imagen en el contenido del editor
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
              console.error('Error al subir la imagen:', err);
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

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.message = 'Por favor, corrige los errores en el formulario.';
      return;
    }

    // Actualiza el contenido del editor antes de enviar
    const content = this.quillEditor.quillEditor.root.innerHTML;
    this.editForm.patchValue({ content });

    if (this.projectId) {
      this.projectService
        .updateProject(this.projectId, this.editForm.value)
        .subscribe({
          next: () => {
            this.message = 'Proyecto actualizado exitosamente.';
            this.router.navigate(['/projects', this.projectId]);
          },
          error: (err) => {
            console.error('Error al actualizar el proyecto:', err);
            this.message = 'Error al actualizar el proyecto.';
          },
        });
    }
  }
}
