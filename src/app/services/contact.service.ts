// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contactMessages';

  constructor(private http: HttpClient) {}

  // Método para enviar el mensaje de contacto
  sendContactMessage(messageData: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      ...messageData,
      date: new Date().toISOString(), // Agrega la fecha actual
    });
  }
}
