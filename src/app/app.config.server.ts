import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/* Añade proveedores específicos para el renderizado en servidor. Con mergeApplicationConfig se combinan ambas configuraciones, 
permitiendo que la aplicación tenga tanto la configuración general como la específica para ejecutarse en el servidor.
Esto es esencial para que la aplicación pueda ejecutarse correctamente en el entorno del servidor, aprovechando las ventajas 
del SSR (mejora en rendimiento, SEO y experiencia de usuario), sin perder la configuración base destinada al navegador. */
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
