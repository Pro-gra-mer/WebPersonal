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
  imports: [FormsModule, ReactiveFormsModule, CommonModule, QuillModule],
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css'],
})
export class UploadProjectComponent {
  projectForm: FormGroup; // Formulario para el proyecto
  message: string | null = null; // Mensaje para notificar al usuario
  @ViewChild('quillEditor', { static: false }) quillEditor: any; // Referencia al editor Quill
  // La directiva @ViewChild permite obtener una referencia a un elemento o componente del template desde la clase del componente.

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
      content: ['', [Validators.required]],
      publishDate: [new Date(), Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  // Envía los datos del proyecto
  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.message = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    // Actualiza el contenido con el texto del editor Quill
    const content = this.quillEditor.quillEditor.root.innerHTML;
    this.projectForm.patchValue({ content });

    // Llama al servicio para crear el proyecto
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

  // Manejador para subir imágenes desde el editor
  handleImageUpload() {
    const input = document.createElement('input'); // Crea dinámicamente un elemento input en el DOM
    input.type = 'file'; // Establece el tipo de input como "file" para permitir la selección de archivos
    input.accept = 'image/*'; // Restringe la selección de archivos a imágenes únicamente

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        // Verifica que el archivo sea una imagen
        if (!file.type.startsWith('image/')) {
          this.message = 'Por favor, sube un archivo de imagen válido.';
          return;
        }

        const formData = new FormData(); // Crea una nueva instancia de FormData para almacenar datos del formulario, incluyendo archivos.
        formData.append('image', file); // Agrega el archivo 'file' al objeto formData con la clave 'image', para enviarlo.

        const token = this.authService.getToken(); // Obtiene el token de autenticación
        if (!token) {
          this.message = 'Error: No estás autenticado.';
          return;
        }

        // Envía la imagen al backend para subirla (a Cloudinary)
        this.http
          .post(
            'https://portfolio-backend-latest-veuz.onrender.com/api/images/upload',
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .subscribe({
            // Cuando se recibe una respuesta exitosa de la solicitud de subida de imagen
            next: (response: any) => {
              const imageUrl = response.imageUrl; // Extrae la URL de la imagen desde la respuesta del servidor
              const range = this.quillEditor.quillEditor.getSelection(); // Obtiene la posición actual (selección) en el editor Quill

              // Si hay una selección activa en el editor
              if (range) {
                // Inserta la imagen en el editor en la posición de la selección actual usando la URL obtenida
                this.quillEditor.quillEditor.insertEmbed(
                  range.index,
                  'image',
                  imageUrl
                );

                // Ajusta la selección del editor para mover el cursor justo después de la imagen insertada
                this.quillEditor.quillEditor.setSelection(range.index + 1);
              }

              // Actualiza el mensaje de estado para indicar que la imagen se subió exitosamente
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

  // Inicializa el editor Quill y añade el manejador personalizado para la subida de imágenes
  onEditorCreated(quillInstance: any): void {
    // Carga de forma dinámica el módulo 'quill'
    import('quill')
      .then(() => {
        // Obtiene el módulo 'toolbar' del editor Quill
        const toolbar = quillInstance.getModule('toolbar');
        /* Asigna un manejador personalizado para el botón de imagen,
         vinculando la función handleImageUpload al contexto actual del componente */
        toolbar.addHandler('image', this.handleImageUpload.bind(this));
      })
      .catch((error) => {
        // En caso de error al cargar Quill, muestra el error en la consola
        console.error('Error loading Quill:', error);
        // Actualiza el mensaje de estado para notificar que no se pudo inicializar el editor
        this.message = 'No se pudo inicializar el editor.';
      });
  }
}
