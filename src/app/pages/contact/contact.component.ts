import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactMessage } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    // Inicializa el formulario de contacto con sus validaciones
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Maneja el envío del formulario de contacto
  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    // Prepara el mensaje de contacto a partir de los valores del formulario
    const contactMessage: ContactMessage = this.contactForm.value;

    // Envía el mensaje a través del servicio y maneja la respuesta
    this.contactService.sendContactMessage(contactMessage).subscribe({
      next: (response) => {
        this.successMessage = 'Mensaje enviado con éxito.';
        this.errorMessage = null;
        this.contactForm.reset(); // Limpia el formulario tras el envío exitoso
        this.submitted = false;
      },
      error: (error) => {
        this.errorMessage =
          'Hubo un error al enviar el mensaje. Intenta de nuevo.';
        this.successMessage = null;
      },
    });
  }
}
