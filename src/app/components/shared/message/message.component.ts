import { Component, OnInit, OnDestroy } from '@angular/core'; // Importación de los módulos necesarios para la creación del componente y los ciclos de vida.
import { Router } from '@angular/router'; // Importación del enrutador de Angular para la navegación.
import { AuthService } from '../../../services/auth.service'; // Servicio de autenticación personalizado.
import { MessageService } from '../../../services/message.service'; // Servicio de manejo de mensajes.
import { Message } from '../../../models/message.model'; // Modelo de datos para mensajes.
import { CommonModule } from '@angular/common'; // Módulo común de Angular.
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'; // Importaciones relacionadas con formularios reactivos.
import { Subject } from 'rxjs'; // Clase Subject de RxJS para manejar suscripciones.
import { takeUntil } from 'rxjs/operators'; // Operador para completar suscripciones automáticamente.

@Component({
  selector: 'app-message', // Selector del componente.
  standalone: true, // Indica que este es un componente independiente.
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Módulos importados para este componente.
  templateUrl: './message.component.html', // Ruta del archivo de plantilla HTML.
  styleUrls: ['./message.component.css'], // Ruta del archivo de estilos CSS.
})
export class MessageComponent implements OnInit, OnDestroy {
  // Implementa interfaces OnInit y OnDestroy.
  readonly MAX_CONTENT_LENGTH = 500; // Constante para la longitud máxima del contenido del mensaje.
  messageForm: FormGroup; // Grupo de formulario reactivo.
  isLoggedIn: boolean = false; // Estado de inicio de sesión del usuario.
  username: string | null = null; // Nombre de usuario.
  isSubmitting: boolean = false; // Estado de envío de formulario.
  errorMessage: string | null = null; // Mensaje de error.
  charactersRemaining: number = this.MAX_CONTENT_LENGTH; // Caracteres restantes permitidos en el mensaje.
  private destroy$ = new Subject<void>(); // Subject utilizado para completar las suscripciones en ngOnDestroy.

  constructor(
    private router: Router, // Servicio de enrutamiento inyectado.
    private authService: AuthService, // Servicio de autenticación inyectado.
    private messageService: MessageService, // Servicio de mensajes inyectado.
    private fb: FormBuilder // FormBuilder inyectado para construir formularios.
  ) {
    // Inicialización del formulario reactivo.
    this.messageForm = this.fb.group({
      content: [
        '',
        [
          Validators.required, // Validación de campo requerido.
          Validators.maxLength(this.MAX_CONTENT_LENGTH), // Validación de longitud máxima.
          Validators.pattern(/^(?!\s*$).+/), // Validación para no permitir solo espacios en blanco.
        ],
      ],
    });

    // Suscripción a los cambios del campo 'content' del formulario para actualizar los caracteres restantes.
    this.messageForm
      .get('content')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.updateCharactersRemaining(value);
      });
  }

  ngOnInit(): void {
    // Suscripción al observable de estado de inicio de sesión.
    this.authService.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (!loggedIn) {
          console.log('User not logged in');
        }
      },
      error: (error) => this.handleError(error),
    });

    // Suscripción al observable de nombre de usuario.
    this.authService.username$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (username) => {
        this.username = username;
      },
      error: (error) => this.handleError(error),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emite un valor para completar las suscripciones.
    this.destroy$.complete(); // Completa el Subject para limpiar suscripciones.
  }

  private updateCharactersRemaining(content: string): void {
    // Actualiza los caracteres restantes permitidos en el mensaje.
    this.charactersRemaining = this.MAX_CONTENT_LENGTH - (content?.length || 0);
  }

  getErrorMessage(): string {
    const contentControl = this.messageForm.get('content');

    if (!contentControl?.errors) {
      return '';
    }

    // Retorna el mensaje de error correspondiente basado en la validación fallida.
    if (contentControl.errors['required']) {
      return 'Message content is required';
    }

    if (contentControl.errors['maxlength']) {
      return `Message cannot exceed ${this.MAX_CONTENT_LENGTH} characters`;
    }

    if (contentControl.errors['pattern']) {
      return 'Message cannot be empty or contain only whitespace';
    }

    return 'Invalid message content';
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = null;

    if (!this.isLoggedIn) {
      console.log('User not logged in, redirecting to login');
      await this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado.
      return;
    }

    if (this.messageForm.invalid) {
      this.errorMessage = this.getErrorMessage(); // Establece el mensaje de error si el formulario es inválido.
      return;
    }

    if (this.isSubmitting) {
      return; // Previene múltiples envíos simultáneos.
    }

    try {
      this.isSubmitting = true;
      const newMessage = this.createMessage(); // Crea un nuevo mensaje basado en el formulario.
      await this.sendMessage(newMessage); // Envía el mensaje.
      this.resetForm(); // Resetea el formulario después de enviar el mensaje.
    } catch (error) {
      this.handleError(error); // Maneja errores de envío.
    } finally {
      this.isSubmitting = false; // Restablece el estado de envío.
    }
  }

  private createMessage(): Message {
    if (!this.username) {
      throw new Error('Cannot create message: username is null'); // Lanza un error si el nombre de usuario es nulo.
    }

    const content = this.messageForm.get('content')?.value.trim(); // Obtiene y recorta el contenido del mensaje.

    return {
      id: Date.now(), // Utiliza la marca de tiempo actual como ID del mensaje.
      content: content,
      date: new Date(),
      username: this.username,
      formattedDate: new Date().toLocaleString(), // Formatea la fecha en una cadena legible.
    };
  }

  private async sendMessage(message: Message): Promise<void> {
    if (!message.content || !message.username) {
      throw new Error('Invalid message format'); // Lanza un error si el formato del mensaje es inválido.
    }

    try {
      await this.messageService.sendMessage(message); // Envía el mensaje utilizando el servicio de mensajes.
    } catch (error) {
      console.error('Error in sendMessage:', error); // Log de error si falla el envío del mensaje.
      throw error;
    }
  }

  private resetForm(): void {
    this.messageForm.reset(); // Resetea el formulario.
    this.charactersRemaining = this.MAX_CONTENT_LENGTH; // Restablece el contador de caracteres restantes.
    this.errorMessage = null; // Limpia el mensaje de error.
  }

  private handleError(error: unknown): void {
    console.error('Detailed error:', error); // Log detallado del error.
    this.errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'; // Establece un mensaje de error basado en el tipo de error.
  }
}
