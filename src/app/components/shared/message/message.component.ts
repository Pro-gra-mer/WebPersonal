import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  content: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); // Verifica el estado de autenticación

    // Obtiene el nombre de usuario logueado, si está disponible
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername(); // Se asegura que AuthService tiene getUsername()
    }
  }

  onSubmit(): void {
    if (this.isLoggedIn) {
      // Crear un objeto de mensaje con los datos del usuario y contenido
      const newMessage: Message = {
        id: Date.now(),
        user: this.username,
        content: this.content,
        date: new Date(),
        formattedDate: '', // Puede ser vacío si se formatea en el servicio
        formatteddate: new Date(),
      };

      // Envía el mensaje usando MessageService
      this.messageService.sendMessage(newMessage).subscribe({
        next: (response) => {
          console.log('Mensaje enviado:', response);
          this.content = ''; // Limpia el campo después de enviar
        },
        error: (error) => {
          console.error('Error al enviar el mensaje:', error);
        },
      });
    } else {
      // Si no está logueado, redirige al formulario de inicio de sesión
      this.router
        .navigate(['/login'])
        .catch((err) => console.error('Error de navegación:', err));
    }
  }
}
