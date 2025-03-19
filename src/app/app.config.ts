import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Para definir la configuración global de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Añade las rutas al providers
    provideHttpClient(withFetch()), // Configura HttpClient como proveedor global para que pueda inyectarse en cualquier componente o servicio de la aplicación.
  ],
};
