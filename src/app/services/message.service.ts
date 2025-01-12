import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl =
    'https://portfolio-backend-latest-veuz.onrender.com/api/messages';
  // Endpoint para manejar mensajes
  private messagesSubject = new BehaviorSubject<Message[]>([]); // Estado reactivo para los mensajes
  public messages$ = this.messagesSubject.asObservable(); // Observable para exponer los mensajes

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeMessages(); // Carga inicial de mensajes
  }

  // Genera encabezados de autorización con el token del usuario
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/']); // Redirige si no hay token
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Carga los mensajes desde la API al iniciar el servicio
  private initializeMessages(): void {
    this.loadMessages().subscribe({
      error: (error) => console.error('Failed to initialize messages:', error),
    });
  }

  // Solicita los mensajes al servidor y actualiza el estado local
  private loadMessages(): Observable<Message[]> {
    return this.http
      .get<Message[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(
        map((messages) => this.formatAndSortMessages(messages)), // Formatea y ordena los mensajes
        tap(
          (formattedMessages) => this.messagesSubject.next(formattedMessages) // Actualiza el estado
        ),
        catchError((error) => {
          throw error; // Manejo de errores
        })
      );
  }

  // Formatea las fechas y ordena los mensajes por fecha descendente
  private formatAndSortMessages(messages: Message[]): Message[] {
    return messages
      .map((message) => ({
        ...message,
        date: new Date(message.date),
        formattedDate: new Date(message.date).toLocaleString(),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Envía un mensaje al servidor y actualiza el estado local
  sendMessage(message: Message): Observable<Message> {
    const messageToSend = {
      ...message,
      date: new Date().toISOString(), // Fecha en formato ISO para el servidor
    };

    return this.http
      .post<Message>(this.apiUrl, messageToSend, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((newMessage) => ({
          ...newMessage,
          date: new Date(newMessage.date),
          formattedDate: new Date(newMessage.date).toLocaleString(),
        })),
        tap({
          next: (formattedNewMessage) => {
            // Actualiza el estado local con el nuevo mensaje
            const currentMessages = this.messagesSubject.value;
            const updatedMessages = this.formatAndSortMessages([
              ...currentMessages,
              formattedNewMessage,
            ]);
            this.messagesSubject.next(updatedMessages);
          },
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  // Permite refrescar los mensajes desde la API
  refreshMessages(): Observable<Message[]> {
    return this.loadMessages();
  }
}
