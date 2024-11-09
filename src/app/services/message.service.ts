import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/messages';
  private messagesSubject = new BehaviorSubject<Message[]>([]);

  // Observable para que otros componentes se suscriban a los mensajes
  public messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMessages(); // Cargar los mensajes al inicializar el servicio
  }

  // Cargar todos los mensajes desde el backend
  private loadMessages(): void {
    this.http.get<Message[]>(this.apiUrl).subscribe((messages) => {
      this.messagesSubject.next(messages); // Emitir los mensajes cargados
    });
  }

  // Obtener todos los mensajes como Observable
  getMessages(): Observable<Message[]> {
    return this.messages$;
  }

  // Método para enviar un nuevo mensaje
  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message).pipe(
      tap((newMessage) => {
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, newMessage]); // Agregar el nuevo mensaje y emitir la lista actualizada
      })
    );
  }

  // Obtener un solo mensaje por ID
  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }
}
