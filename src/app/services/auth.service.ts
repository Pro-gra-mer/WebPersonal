import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = true;
  private admin = true;
  private usernameSubject = new BehaviorSubject<string>('Rebeca'); // Emite el nombre de usuario actual

  // Observable público que emite el valor del username
  public username$: Observable<string> = this.usernameSubject.asObservable();

  login(username: string, isAdmin: boolean): void {
    this.loggedIn = true;
    this.admin = isAdmin;
    this.usernameSubject.next(username); // Emite el nuevo nombre de usuario
  }

  logout(): void {
    this.loggedIn = false;
    this.admin = false;
    this.usernameSubject.next(''); // Emite un valor vacío al cerrar sesión
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.admin;
  }
}
