import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://portfolio-backend-latest-veuz.onrender.com/auth';

  private loggedIn = new BehaviorSubject<boolean>(false); // Estado de autenticación
  private admin = new BehaviorSubject<boolean>(false); // Estado de rol de administrador
  private email = new BehaviorSubject<string | null>(null); // Estado del email
  private username = new BehaviorSubject<string | null>(null); // Estado del nombre de usuario para registro/mensajes

  constructor(private http: HttpClient, private router: Router) {}

  /* Observables para compartir estados con los componentes. 
  Se utiliza el sufijo $ por convención para indicar que esas variables son observables.
  Esto facilita distinguir entre valores simples y datos reactivos */
  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  public isAdmin$: Observable<boolean> = this.admin.asObservable();
  public email$: Observable<string | null> = this.email.asObservable();
  public username$: Observable<string | null> = this.username.asObservable();

  // Verifica si un token está expirado
  private isTokenExpired(token: string): boolean {
    try {
      const payload: any = jwtDecode(token);
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  // Registra un nuevo usuario y devuelve la respuesta del servidor
  register(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Inicia sesión con las credenciales proporcionadas y gestiona el token devuelto
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap((token: string) => {
          try {
            // Si el token es válido, se guarda en localStorage
            if (this.isTokenExpired(token)) {
              throw new Error('Token expirado');
            }

            localStorage.setItem('token', token); // Guarda el token en localStorage

            // Decodificar el token y actualizar el estado
            const payload: any = jwtDecode(token);
            this.loggedIn.next(true);
            this.admin.next(payload.role === 'ADMIN');
            this.email.next(payload.sub);
            this.username.next(payload.username);
          } catch (error) {
            this.logout(); // Desloguea en caso de error
            throw error;
          }
        })
      );
  }

  // Obtiene y valida el token almacenado en localStorage; retorna el token si es válido o null en caso contrario
  getToken(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      return null;
    }

    try {
      const parsedToken = JSON.parse(storedToken); // Parseo el objeto JSON
      if (!parsedToken.token) {
        return null;
      }

      if (this.isTokenExpired(parsedToken.token)) {
        // Validar si el token está expirado
        this.logout(); // Invalida el token si está expirado
        return null;
      }

      return parsedToken.token; // Retornar solo el valor del token
    } catch (error) {
      this.logout();
      return null;
    }
  }

  // Devuelve el estado actual de autenticación del usuario
  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  // Cierra la sesión del usuario, limpia el estado y redirige a la página principal
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

  // Devuelve true si el usuario tiene rol de administrador, false en caso contrario
  isAdmin(): boolean {
    return this.admin.getValue();
  }

  // Decodifica el token y retorna el rol del usuario, o null si no se puede determinar
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

  // Solicita restablecimiento de contraseña
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, { email });
  }

  // Restablece la contraseña utilizando un token y la nueva contraseña proporcionada
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
    });
  }

  // Restaura la sesión del usuario si existe un token válido en localStorage
  private restoreSession(): void {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage

    if (token && !this.isTokenExpired(token)) {
      try {
        const payload: any = jwtDecode(token); // Decodifica el token
        this.loggedIn.next(true); // Actualiza el estado de autenticación
        this.admin.next(payload.role === 'ADMIN'); // Actualiza el rol
        this.email.next(payload.sub); // Actualiza el email
        this.username.next(payload.username); // Actualiza el username
      } catch (error) {
        console.error('Error al restaurar la sesión:', error);
        this.clearSessionState(); // Limpia el estado, pero no redirige
      }
    } else {
      this.clearSessionState(); // Limpia el estado si no hay token o está expirado
    }
  }

  // Limpia el estado de autenticación y rol del usuario sin redirigir
  private clearSessionState(): void {
    this.loggedIn.next(false);
    this.admin.next(false);
    this.email.next(null);
    this.username.next(null);
    // No redirigir automáticamente desde restoreSession
  }
}
