import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    // Configura el formulario y agrega validaciones, incluida la de coincidencia de contraseñas
    this.resetForm = this.formBuilder.group(
      {
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

  // Obtiene el token de la URL al inicializar el componente
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  // Valida que los campos 'password' y 'confirmPassword' coincidan
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    // Retorna null si coinciden, o un error en caso contrario
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Envía el formulario y procesa el restablecimiento de contraseña
  onSubmit(): void {
    if (this.resetForm.invalid) {
      return; // No procede si el formulario es inválido
    }

    const password = this.resetForm.get('password')?.value;

    // Llama al servicio de autenticación para restablecer la contraseña usando el token y la nueva contraseña
    this.authService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.isSuccess = true; // Indica que la operación fue exitosa
        this.isError = false;
      },
      error: (err) => {
        this.isError = true; // Indica que ocurrió un error
        this.errorMessage =
          err.error.message || 'Error al restablecer la contraseña.';
        this.isSuccess = false;
      },
    });
  }
}
