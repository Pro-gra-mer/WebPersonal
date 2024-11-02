// src/app/services/message.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = '/assets/message.json'; // Ruta al archivo JSON en assets

  constructor(private http: HttpClient) {}

  // Obtener todos los mensajes
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  // Agregar un nuevo mensaje (solo simulado aquí, ya que no modifica el JSON)
  addMessage(newMessage: Message): Observable<Message> {
    // Este método sería un POST real a una API, aquí solo simula la estructura
    return this.http.post<Message>(this.apiUrl, newMessage);
  }

  // Obtener un solo mensaje por ID
  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }
}
