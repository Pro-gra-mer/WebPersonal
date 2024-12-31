import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.loginError = null; // Reinicia el mensaje de error

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (errorResponse) => {
        // Maneja los códigos de estado HTTP y los mensajes
        if (errorResponse.status === 404) {
          this.loginError = 'El usuario no existe.';
        } else if (errorResponse.status === 401) {
          this.loginError = 'La contraseña es incorrecta.';
        } else if (errorResponse.status === 403) {
          this.loginError =
            'Tu cuenta no está activada. Por favor, verifica tu correo.';
        } else {
          this.loginError =
            'Error en el servidor. Por favor, intenta nuevamente.';
        }
      },
    });
  }
}
