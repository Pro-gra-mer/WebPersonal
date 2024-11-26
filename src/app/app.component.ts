import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FooterComponent } from './components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscripción para obtener el estado de autenticación y rol del usuario
    this.authSubscription.add(
      this.authService.isLoggedIn$.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      })
    );
    this.authSubscription.add(
      this.authService.isAdmin$.subscribe((admin) => {
        this.isAdmin = admin;
      })
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); // Limpiar suscripciones al destruir el componente
  }

  logout(): void {
    this.authService.logout(); // Llamar a logout del servicio
  }
}
