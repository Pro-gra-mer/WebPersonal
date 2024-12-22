import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Importación corregida de jwt-decode
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private loggedIn = new BehaviorSubject<boolean>(false); // Estado de autenticación
  private admin = new BehaviorSubject<boolean>(false); // Estado de rol de administrador
  private email = new BehaviorSubject<string | null>(null); // Estado del email
  private username = new BehaviorSubject<string | null>(null); // Estado del nombre de usuario para registro/mensajes

  constructor(private http: HttpClient, private router: Router) {}

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
    return this.http
      .post(`${this.apiUrl}/register`, userData) // Quitar `responseType: 'text'`
      .pipe(
        tap((response: any) => {
          console.log('Respuesta del backend:', response); // Respuesta para casos exitosos
        })
      );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap((token: string) => {
          try {
            // Si el token es válido, lo guardamos en localStorage
            if (this.isTokenExpired(token)) {
              throw new Error('Token expirado');
            }

            localStorage.setItem('token', token); // Guardamos el token en localStorage

            // Decodificar el token y actualizar el estado
            const payload: any = jwtDecode(token);
            this.loggedIn.next(true);
            this.admin.next(payload.role === 'ADMIN');
            this.email.next(payload.sub); // El email se extrae del 'sub' en el JWT
            this.username.next(payload.username); // El nombre de usuario se extrae del JWT
          } catch (error) {
            console.error('Error durante el proceso de login:', error);
            this.logout();
            throw error; // Lanzamos el error para manejarlo en el componente
          }
        })
      );
  }

  getToken(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.log('localStorage no está disponible.');
      return null;
    }

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      console.log('Token no encontrado en localStorage.');
      return null;
    }

    try {
      const parsedToken = JSON.parse(storedToken); // Parseamos el objeto JSON
      if (!parsedToken.token) {
        console.log('La propiedad token no existe en localStorage.');
        return null;
      }

      if (this.isTokenExpired(parsedToken.token)) {
        // Validar si el token está expirado
        console.log('Token expirado. Realizando logout...');
        this.logout();
        return null;
      }

      return parsedToken.token; // Retornar solo el valor del token
    } catch (error) {
      console.error('Error al parsear el token:', error);
      this.logout();
      return null;
    }
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
    this.router.navigate(['/']).then(() => {
      window.scrollTo(0, 0); // Desplaza la página al principio
    });
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

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
    });
  }
}
