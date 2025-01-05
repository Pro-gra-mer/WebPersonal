import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// Protector de rutas que asegura que solo los usuarios autenticados puedan acceder a ciertas rutas
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']); // Redirige a /login si no está autenticado
        return false;
      }
      return true;
    })
  );
};
