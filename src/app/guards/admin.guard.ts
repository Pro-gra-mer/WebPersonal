import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

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
