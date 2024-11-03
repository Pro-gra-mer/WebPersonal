import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = 'UsuarioEjemplo';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Actualiza isLoggedIn con el estado del servicio de autenticación
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onSubmit(): void {
    if (this.isLoggedIn) {
      console.log('Mensaje enviado'); // Simulación de envío
    } else {
      this.router
        .navigate(['/login'])
        .catch((err) => console.error('Error de navegación:', err));
    }
  }
}
