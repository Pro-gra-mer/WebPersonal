import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  message: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9_]+$'),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
          ],
        ],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validador de coincidencia de contraseñas
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Manejo del envío del formulario
  onsubmit(): void {
    this.submitted = true;
    this.message = null;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.message =
          'Registro exitoso. Te hemos enviado un enlace de confirmación a tu correo. Por favor, verifica tu cuenta.';
        this.registerForm.reset(); // Limpia los campos del formulario
        this.submitted = false; // Restablece el estado de envío
      },
      error: (error) => {
        if (error.status === 400 && error.error.message) {
          // Captura y muestra el mensaje del backend
          this.message = 'Error en el registro: ' + error.error.message;
        } else {
          // Mensaje genérico para errores inesperados
          this.message =
            'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.';
        }
      },
    });
  }
}
