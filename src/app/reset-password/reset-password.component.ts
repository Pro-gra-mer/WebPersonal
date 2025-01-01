import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Extraer el token de la URL
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isError = false;
      },
      error: (err) => {
        this.isError = true;
        this.errorMessage =
          err.error.message || 'Error al restablecer la contraseña.';
        this.isSuccess = false;
      },
    });
  }
}
