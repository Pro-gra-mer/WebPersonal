import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'; // Importamos Router para redirecciones

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/api/messages';
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadMessages();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/']);
      return new HttpHeaders(); // Encabezado vacío si no hay token
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private loadMessages(): void {
    this.http
      .get<Message[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(
        map(
          (response) =>
            response
              .map((message) => ({
                ...message,
                date: new Date(message.date),
                formattedDate: new Date(message.date).toLocaleString(),
              }))
              .sort((a, b) => b.date.getTime() - a.date.getTime()) // Ordena de más recientes a menos recientes
        )
      )
      .subscribe({
        next: (messages) => this.messagesSubject.next(messages),
        error: (err) =>
          console.error('Error al cargar mensajes:', err.message || err),
      });
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http
      .post<Message>(this.apiUrl, message, { headers: this.getAuthHeaders() })
      .pipe(
        tap((newMessage) => {
          const currentMessages = this.messagesSubject.value;
          this.messagesSubject.next([...currentMessages, newMessage]);
        })
      );
  }
}
