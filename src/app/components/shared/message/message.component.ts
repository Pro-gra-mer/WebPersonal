import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit, OnDestroy {
  readonly MAX_CONTENT_LENGTH = 500; // Máxima longitud permitida para el mensaje
  messageForm: FormGroup = this.fb.group({
    content: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.MAX_CONTENT_LENGTH),
        Validators.pattern(/^(?!\s*$).+/), // Valida que no sea solo espacios en blanco
      ],
    ],
  });

  isLoggedIn: boolean = false;
  username: string | null = null;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  charactersRemaining: number = this.MAX_CONTENT_LENGTH;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.setupFormSubscription();
  }

  // Configura una suscripción para actualizar el contador de caracteres restantes
  private setupFormSubscription(): void {
    this.messageForm
      .get('content')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.updateCharactersRemaining(value));
  }

  ngOnInit(): void {
    // Combina el estado de sesión y el nombre de usuario para actualizar las propiedades locales
    combineLatest([this.authService.isLoggedIn$, this.authService.username$])
      .pipe(
        takeUntil(this.destroy$),
        map(([isLoggedIn, username]) => ({ isLoggedIn, username }))
      )
      .subscribe({
        next: ({ isLoggedIn, username }) => {
          this.isLoggedIn = isLoggedIn;
          this.username = username;
        },
        error: (error) => this.handleError(error),
      });
  }

  ngOnDestroy(): void {
    // Limpia las suscripciones para evitar fugas de memoria
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Calcula y actualiza el número de caracteres restantes permitidos en el mensaje
  private updateCharactersRemaining(content: string): void {
    this.charactersRemaining = this.MAX_CONTENT_LENGTH - (content?.length || 0);
  }

  // Retorna un mensaje de error adecuado basado en las validaciones del formulario
  getErrorMessage(): string {
    const contentControl = this.messageForm.get('content');
    if (!contentControl?.errors) return '';

    if (contentControl.errors['required']) return 'Message content is required';
    if (contentControl.errors['maxlength'])
      return `Message cannot exceed ${this.MAX_CONTENT_LENGTH} characters`;
    if (contentControl.errors['pattern'])
      return 'Message cannot be empty or contain only whitespace';

    return 'Invalid message content';
  }

  // Maneja el envío del formulario, creando y enviando el nuevo mensaje
  onSubmit(): void {
    this.errorMessage = null;

    // Si el usuario no está autenticado, redirige al login
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    // Si el formulario es inválido, muestra el error correspondiente
    if (this.messageForm.invalid) {
      this.errorMessage = this.getErrorMessage();
      return;
    }

    // Si se está enviando o no se tiene el nombre de usuario, se aborta la acción
    if (this.isSubmitting || !this.username) {
      this.handleError(new Error('Cannot create message: invalid state'));
      return;
    }

    this.isSubmitting = true;

    // Crea un nuevo mensaje, limpiando el contenido (trim) y asignando la fecha actual
    const newMessage: Message = {
      id: Date.now(),
      content: this.messageForm.get('content')?.value.trim(),
      date: new Date(),
      username: this.username,
      formattedDate: new Date().toLocaleString(),
    };

    // Envía el mensaje al backend y maneja la respuesta
    this.messageService
      .sendMessage(newMessage)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isSubmitting = false))
      )
      .subscribe({
        next: () => this.resetForm(),
        error: (error) => this.handleError(error),
      });
  }

  // Reinicia el formulario y restablece los contadores y mensajes de error
  private resetForm(): void {
    this.messageForm.reset();
    this.charactersRemaining = this.MAX_CONTENT_LENGTH;
    this.errorMessage = null;
  }

  // Maneja y muestra errores en el componente
  private handleError(error: unknown): void {
    this.errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
  }
}
