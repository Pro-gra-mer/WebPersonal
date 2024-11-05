import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  username: string = '';
  content: string = '';
  private usernameSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    // Suscríbete a los cambios de username
    this.usernameSubscription = this.authService.username$.subscribe(
      (username) => {
        this.username = username;
      }
    );
  }

  ngOnDestroy(): void {
    // Cancela la suscripción para evitar fugas de memoria
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.isLoggedIn) {
      // Crear el mensaje y enviarlo si el usuario está logueado
      const newMessage: Message = {
        id: Date.now(),
        user: this.username,
        content: this.content,
        date: new Date(),
        formattedDate: '',
        formatteddate: new Date(),
      };

      this.messageService.sendMessage(newMessage).subscribe({
        next: (response) => {
          console.log('Mensaje enviado:', response);
          this.content = ''; // Limpia el campo de mensaje después de enviar
        },
        error: (error) => {
          console.error('Error al enviar el mensaje:', error);
        },
      });
    } else {
      // Si el usuario no está logueado, redirige a la página de inicio de sesión
      this.router
        .navigate(['/login'])
        .catch((err) => console.error('Error de navegación:', err));
    }
  }
}
