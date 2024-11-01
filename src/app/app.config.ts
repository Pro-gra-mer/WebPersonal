import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importación de las rutas desde app.routes.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Añadir las rutas al providers
    provideHttpClient(withFetch()), // Configura HttpClient como proveedor global
  ],
};
