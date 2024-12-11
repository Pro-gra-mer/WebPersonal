import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact-messages'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  sendContactMessage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
