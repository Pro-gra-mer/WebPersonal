import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importar las rutas desde app.routes.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configurar las rutas aquí
  ],
};
