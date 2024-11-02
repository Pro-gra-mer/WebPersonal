import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    const router = appRef.injector.get(Router);

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0); // Desplaza la ventana a la parte superior en cada cambio de ruta
      });
  })
  .catch((err) => console.error(err));
