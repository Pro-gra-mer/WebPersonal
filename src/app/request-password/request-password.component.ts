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

  // Método que se ejecuta al enviar el formulario para solicitar el restablecimiento de contraseña
  onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de email
    // Comprueba que se haya ingresado un correo y que cumpla con el formato correcto
    if (this.email && emailRegex.test(this.email)) {
      // Llama al servicio para solicitar el restablecimiento de contraseña
      this.authService.forgotPassword(this.email).subscribe({
        // Si la solicitud es exitosa, actualiza el estado para mostrar mensaje de éxito
        next: () => {
          this.isSuccess = true;
          this.isError = false;
        },
        // Si ocurre un error, actualiza el estado para mostrar mensaje de error y detalla el error recibido
        error: (err) => {
          this.isError = true;
          this.errorMessage =
            err.error.message || 'Error al enviar la solicitud.';
          this.isSuccess = false;
        },
      });
    } else {
      // Si el correo es inválido, establece el estado de error y asigna un mensaje
      this.isError = true;
      this.errorMessage = 'Por favor, ingresa un correo válido.';
    }
  }
}
