📚 Portfolio de Proyectos Personales

📖 Introducción

Este proyecto es una aplicación web para la gestión de proyectos, desarrollada con Spring Boot 3 y Java 21 para el backend, y Angular 17 para el frontend. La aplicación permite a los usuarios autenticados enviar mensajes, mientras que solo la administradora tiene permisos para crear, editar y eliminar proyectos. El sistema está diseñado para garantizar seguridad y eficiencia, con una arquitectura robusta que facilita el manejo de roles y la administración de contenido de manera sencilla. A lo largo del desarrollo, se ha dado especial atención a la usabilidad, manteniendo un enfoque claro en la experiencia del usuario.

---

✨ Características Clave

✅ Autenticación de Usuarios

Registro y autenticación obligatoria para acceder a funcionalidades avanzadas.

Confirmación de cuenta a través de correo electrónico con MailSender.

Seguridad reforzada para garantizar acceso seguro a la aplicación.

✅ Mensajería Dinámica

Usuarios autenticados pueden enviar mensajes.

El formulario captura automáticamente el nombre de usuario y habilita el botón "Enviar".

✅ Restablecimiento de Contraseña

Formulario para solicitar restablecimiento de contraseña.

Enlace seguro enviado por correo con MailSender.

Proceso seguro que impide modificaciones no autorizadas de la contraseña.

✅ Formulario de Contacto

Permite a los usuarios enviar mensajes al administrador.

Envío de correos a través de MailSender para garantizar la entrega segura.

✅ Gestión de Proyectos

La administradora puede crear, editar y eliminar proyectos.

Acceso al Admin Dashboard desde la navbar.

Formulario de subida de proyectos con Quill Editor.

✅ Persistencia en Base de Datos

Datos almacenados en MySQL para garantizar gestión a largo plazo y escalabilidad.

---

🛠️ Herramientas y Tecnologías Utilizadas

Backend

Spring Boot 3: Desarrollo de backend escalable y de alto rendimiento.

Java 21: Lenguaje de programación robusto y seguro.

Spring Security: Autenticación y autorización con JWT.

Spring JPA: Interacción con la base de datos mediante JPA.

MySQL: Base de datos para almacenamiento de proyectos y usuarios.

MailSender: Envío de correos para activación de cuenta y recuperación de contraseña.

Frontend

Angular 17: SPA con integración a APIs RESTful.

Bootstrap: Estilos y diseño responsivo.

Quill Editor: Edición de contenido enriquecido.

Otros

Cloudinary: Almacenamiento y optimización de imágenes.

Postman: Pruebas y validación de APIs RESTful.

Docker: Contenerización para despliegue eficiente.

Render: Plataforma de despliegue gratuita para el backend.

Hostinger: Hosting del frontend y base de datos.

---

## 🌐 Cómo Ejecutar el Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/mi-web-personal.git
   cd mi-web-personal
Instala las dependencias:

npm install
Inicia el servidor de desarrollo:

ng serve
Inicia el backend simulado (JSON Server):

npx json-server --watch src/assets/simulacionBBDD.json --port 3000
Abre el proyecto en el navegador:

http://localhost:4200
⚙️ Configuración para Producción
Configura un backend real utilizando Java y Spring Boot.
Conecta el frontend con el backend mediante una API REST.
Configura MySQL como base de datos en el entorno de producción.
📄 Licencia
Este proyecto está bajo la licencia MIT. Puedes utilizarlo, modificarlo y distribuirlo libremente.

🧑‍💻 Autor
Desarrollado por Rebeca Pérez.
Si tienes dudas o sugerencias, ¡no dudes en contactarme!

🌟 Agradecimientos
Angular
Bootstrap
JSON Server
ChatGPT


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
