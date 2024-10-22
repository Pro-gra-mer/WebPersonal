import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importación de las rutas desde app.routes.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Añadir las rutas al providers
  ],
};
