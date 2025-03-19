import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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
    // Configuración del formulario de registro con validaciones
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
      { validators: this.passwordMatchValidator } // Aplica validación de coincidencia de contraseñas
    );
  }

  // Validador que verifica si 'password' y 'confirmPassword' coinciden
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Maneja el envío del formulario de registro
  onsubmit(): void {
    this.submitted = true;
    this.message = null;

    // No continúa si el formulario es inválido
    if (this.registerForm.invalid) {
      return;
    }

    // Llama al servicio de registro y maneja la respuesta
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        // Muestra mensaje de éxito y resetea el formulario
        this.message =
          'Registro exitoso. Te hemos enviado un enlace de confirmación a tu correo. Por favor, verifica tu cuenta.';
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        // Muestra error específico si está disponible, o un mensaje genérico
        if (error.status === 400 && error.error.message) {
          this.message = 'Error en el registro: ' + error.error.message;
        } else {
          this.message =
            'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.';
        }
      },
    });
  }
}
