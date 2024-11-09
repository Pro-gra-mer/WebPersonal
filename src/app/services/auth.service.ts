import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private admin = false;
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  public username$: Observable<string | null> =
    this.usernameSubject.asObservable();

  register(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${credentials.email}`)
      .pipe(
        map((users) => {
          const user = users[0];
          if (user && user.password === credentials.password) {
            this.loggedIn = true;
            this.admin = user.isAdmin ?? false;
            this.usernameSubject.next(user.username);
            return { success: true, username: user.username };
          } else {
            throw new Error('Credenciales inválidas.');
          }
        }),
        catchError((error) => {
          console.error(error);
          return of({
            success: false,
            error: 'Credenciales inválidas o error en autenticación.',
          });
        })
      );
  }

  logout(): void {
    this.loggedIn = false;
    this.admin = false;
    this.usernameSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  // Obtiene el nombre de usuario actual, devolviendo '' si es null
  getUsername(): string {
    return this.usernameSubject.value ?? '';
  }
}
