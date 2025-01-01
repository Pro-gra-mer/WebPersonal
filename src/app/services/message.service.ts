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
  private apiUrl = 'http://localhost:8080/api/messages';
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeMessages();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return new HttpHeaders();
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private initializeMessages(): void {
    this.loadMessages().subscribe({
      error: (error) => console.error('Failed to initialize messages:', error),
    });
  }

  private loadMessages(): Observable<Message[]> {
    return this.http
      .get<Message[]>(this.apiUrl, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((messages) => this.formatAndSortMessages(messages)),
        tap((formattedMessages) =>
          this.messagesSubject.next(formattedMessages)
        ),
        catchError((error) => {
          throw error;
        })
      );
  }

  private formatAndSortMessages(messages: Message[]): Message[] {
    return messages
      .map((message) => ({
        ...message,
        date: new Date(message.date),
        formattedDate: new Date(message.date).toLocaleString(),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  sendMessage(message: Message): Observable<Message> {
    // Ensure the message has the correct date format before sending
    const messageToSend = {
      ...message,
      date: new Date().toISOString(), // Ensure we send an ISO string to the backend
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

  refreshMessages(): Observable<Message[]> {
    return this.loadMessages();
  }
}
