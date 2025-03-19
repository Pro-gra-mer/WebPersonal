import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl =
    'https://portfolio-backend-latest-veuz.onrender.com/api/contact-messages';

  constructor(private http: HttpClient) {}

  // Envía un mensaje de contacto al servidor y retorna la respuesta como Observable
  sendContactMessage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
