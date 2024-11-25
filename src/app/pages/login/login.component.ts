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

    // Valida el formulario
    if (this.loginForm.invalid) {
      return;
    }

    // Llama al servicio de autenticación
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        // Redirige al usuario después del inicio de sesión exitoso
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loginError = 'Credenciales inválidas o error en el servidor.';
      },
    });
  }
}
