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
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.contactForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const contactMessage: ContactMessage = this.contactForm.value;

    try {
      const response = await firstValueFrom(
        this.contactService.sendContactMessage(contactMessage)
      );
      console.log('Mensaje enviado con éxito:', response);
      this.successMessage = 'Mensaje enviado con éxito.';
      this.errorMessage = '';
      this.contactForm.reset();
      this.submitted = false;
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      this.errorMessage =
        'Hubo un error al enviar el mensaje. Intenta de nuevo.';
      this.successMessage = '';
    }
  }
}
