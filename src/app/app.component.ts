import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FooterComponent } from './components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false; // Determina si el usuario es admin
  isLoggedIn: boolean = false; // Determina si el usuario está logueado

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Actualiza el estado de isAdmin e isLoggedIn desde el AuthService
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.isAdmin = this.authService.isAdmin(); // Actualiza el estado
    this.isLoggedIn = this.authService.isLoggedIn(); // Actualiza el estado
  }
}
