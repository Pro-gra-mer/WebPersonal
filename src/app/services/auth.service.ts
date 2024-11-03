// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = true;
  private admin = true;

  // Simula el inicio de sesión
  login(username: string, isAdmin: boolean): void {
    this.loggedIn = true;
    this.admin = isAdmin;
  }

  logout(): void {
    this.loggedIn = false;
    this.admin = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.admin;
  }
}
