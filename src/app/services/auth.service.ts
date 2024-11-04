import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = true;
  private admin = true;
  private username = 'Rebeca'; // Simulación de un nombre de usuario logueado

  // Simula el inicio de sesión y asigna el nombre de usuario
  login(username: string, isAdmin: boolean): void {
    this.loggedIn = true;
    this.admin = isAdmin;
    this.username = username; // Guarda el nombre del usuario al iniciar sesión
  }

  logout(): void {
    this.loggedIn = false;
    this.admin = false;
    this.username = ''; // Limpia el nombre del usuario al cerrar sesión
    console.log(this.username); // La consola muestra que sí se limpia el username
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  getUsername(): string {
    return this.username;
  }
}
