import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './request-password.component.html',
  styleUrl: './request-password.component.css',
})
export class RequestPasswordComponent {
  email: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de email
    if (this.email && emailRegex.test(this.email)) {
      this.authService.forgotPassword(this.email).subscribe({
        next: () => {
          this.isSuccess = true;
          this.isError = false;
        },
        error: (err) => {
          this.isError = true;
          this.errorMessage =
            err.error.message || 'Error al enviar la solicitud.';
          this.isSuccess = false;
        },
      });
    } else {
      this.isError = true;
      this.errorMessage = 'Por favor, ingresa un correo válido.';
    }
  }
}
