import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// Protector de rutas que asegura que solo el admin puedan acceder a ellas
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdmin$.pipe(
    map((isAdmin) => {
      if (!isAdmin) {
        router.navigate(['/unauthorized']); // Redirige a /unauthorized si no es admin
        return false;
      }
      return true;
    })
  );
};
