import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Importación corregida de jwt-decode
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private loggedIn = new BehaviorSubject<boolean>(false); // Estado de autenticación
  private admin = new BehaviorSubject<boolean>(false); // Estado de rol de administrador
  private email = new BehaviorSubject<string | null>(null); // Estado del email
  private username = new BehaviorSubject<string | null>(null); // Estado del nombre de usuario para registro/mensajes

  constructor(private http: HttpClient) {}

  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  public isAdmin$: Observable<boolean> = this.admin.asObservable();
  public email$: Observable<string | null> = this.email.asObservable();
  public username$: Observable<string | null> = this.username.asObservable();

  private isTokenExpired(token: string): boolean {
    try {
      const payload: any = jwtDecode(token);
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true;
    }
  }

  register(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap((token: string) => {
          try {
            console.log('Token recibido:', token);
            if (this.isTokenExpired(token)) {
              throw new Error('Token expirado');
            }
            localStorage.setItem('token', token);

            const payload: any = jwtDecode(token);
            this.loggedIn.next(true);
            this.admin.next(payload.role === 'ADMIN');
            this.email.next(payload.sub); // Usa el email como identificador principal
          } catch (error) {
            console.error('Error durante el proceso de login:', error);
            throw error;
          }
        })
      );
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (token && this.isTokenExpired(token)) {
      this.logout();
      return null;
    }
    return token;
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.admin.next(false);
    this.email.next(null); // Limpia el email
    this.username.next(null); // Limpia el username
  }

  isAdmin(): boolean {
    return this.admin.getValue();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload: any = jwtDecode(token);
        return payload.role || null;
      } catch (error) {
        console.error(
          'Error al decodificar el token para obtener el rol:',
          error
        );
        return null;
      }
    }
    return null;
  }

  // Método opcional para establecer el username después del registro
  setUsername(username: string): void {
    this.username.next(username);
  }
}
