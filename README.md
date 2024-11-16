# Mi Web Personal - Angular

Este proyecto es una aplicación web desarrollada en Angular que sirve como portafolio personal. Incluye funcionalidades para gestionar proyectos, artículos, mensajes, y formularios dinámicos para contacto y registro de usuarios.

---

## 🛠️ Tecnologías Utilizadas

- **Angular 17.3.10**: Framework principal para el frontend.
- **Bootstrap 5**: Para el diseño responsivo y estilización.
- **TypeScript**: Lenguaje principal para el desarrollo.
- **JSON Server**: Utilizado como backend simulado durante el desarrollo.
- **MySQL** (planeado): Base de datos para almacenar información persistente en producción.

---

## 🚀 Funcionalidades Principales

### Gestión de Usuarios
- Registro y login con validaciones en el frontend.
- Diferenciación entre usuario estándar y administrador.
- Manejo de sesiones simuladas con el `AuthService`.

### Proyectos
- Sección para mostrar proyectos con detalles individuales.
- Subida de proyectos desde la **Admin Dashboard**.
- Almacenamiento y visualización de proyectos usando un backend simulado.

### Artículos
- Visualización de artículos con detalles individuales.
- Campos adicionales para SEO como slug, meta descripción, y palabra clave.
- Subida de artículos desde la **Admin Dashboard**.

### Mensajes
- Mensajería dinámica en tiempo real usando JSON Server.
- Formulario de mensajes integrado en la página principal.
- Lista de mensajes con opción de carga progresiva.

### Formulario de Contacto
- Formulario con validaciones para nombre, asunto, correo y mensaje.
- Planeado: Integración con **Nodemailer** para enviar mensajes por correo.

---

## 📦 Estructura del Proyecto
📦src
 ┣ 📂app
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📂admin-dashboard
 ┃ ┃ ┃ ┃ ┣ 📜admin-dashboard.component.css
 ┃ ┃ ┃ ┃ ┣ 📜admin-dashboard.component.html
 ┃ ┃ ┃ ┃ ┣ 📜admin-dashboard.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜admin-dashboard.component.ts
 ┃ ┃ ┃ ┣ 📂upload-article
 ┃ ┃ ┃ ┃ ┣ 📜upload-article.component.css
 ┃ ┃ ┃ ┃ ┣ 📜upload-article.component.html
 ┃ ┃ ┃ ┃ ┣ 📜upload-article.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜upload-article.component.ts
 ┃ ┃ ┃ ┗ 📂upload-project
 ┃ ┃ ┃ ┃ ┣ 📜upload-project.component.css
 ┃ ┃ ┃ ┃ ┣ 📜upload-project.component.html
 ┃ ┃ ┃ ┃ ┗ 📜upload-project.component.ts
 ┃ ┃ ┣ 📂public
 ┃ ┃ ┃ ┣ 📂article-card
 ┃ ┃ ┃ ┃ ┣ 📜article-card.component.css
 ┃ ┃ ┃ ┃ ┣ 📜article-card.component.html
 ┃ ┃ ┃ ┃ ┣ 📜article-card.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜article-card.component.ts
 ┃ ┃ ┃ ┣ 📂carousel
 ┃ ┃ ┃ ┃ ┣ 📜carousel.component.css
 ┃ ┃ ┃ ┃ ┣ 📜carousel.component.html
 ┃ ┃ ┃ ┃ ┣ 📜carousel.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜carousel.component.ts
 ┃ ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┃ ┣ 📜footer.component.css
 ┃ ┃ ┃ ┃ ┣ 📜footer.component.html
 ┃ ┃ ┃ ┃ ┣ 📜footer.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜footer.component.ts
 ┃ ┃ ┃ ┣ 📂last-articles
 ┃ ┃ ┃ ┃ ┣ 📜last-articles.component.css
 ┃ ┃ ┃ ┃ ┣ 📜last-articles.component.html
 ┃ ┃ ┃ ┃ ┣ 📜last-articles.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜last-articles.component.ts
 ┃ ┃ ┃ ┣ 📂last-projects
 ┃ ┃ ┃ ┃ ┣ 📜last-projects.component.css
 ┃ ┃ ┃ ┃ ┣ 📜last-projects.component.html
 ┃ ┃ ┃ ┃ ┗ 📜last-projects.component.ts
 ┃ ┃ ┃ ┣ 📂messages-list
 ┃ ┃ ┃ ┃ ┣ 📜messages-list.component.css
 ┃ ┃ ┃ ┃ ┣ 📜messages-list.component.html
 ┃ ┃ ┃ ┃ ┣ 📜messages-list.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜messages-list.component.ts
 ┃ ┃ ┃ ┗ 📂project-card
 ┃ ┃ ┃ ┃ ┣ 📜project-card.component.css
 ┃ ┃ ┃ ┃ ┣ 📜project-card.component.html
 ┃ ┃ ┃ ┃ ┗ 📜project-card.component.ts
 ┃ ┃ ┣ 📂shared
 ┃ ┃ ┃ ┗ 📂message
 ┃ ┃ ┃ ┃ ┣ 📜message.component.css
 ┃ ┃ ┃ ┃ ┣ 📜message.component.html
 ┃ ┃ ┃ ┃ ┣ 📜message.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜message.component.ts
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┗ 📂user-logged
 ┃ ┃ ┃ ┃ ┣ 📜user-logged.component.css
 ┃ ┃ ┃ ┃ ┣ 📜user-logged.component.html
 ┃ ┃ ┃ ┃ ┣ 📜user-logged.component.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜user-logged.component.ts
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜article.model.ts
 ┃ ┃ ┣ 📜message.model.ts
 ┃ ┃ ┣ 📜project.model.ts
 ┃ ┃ ┗ 📜user.model.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂aboutme
 ┃ ┃ ┃ ┣ 📜aboutme.component.css
 ┃ ┃ ┃ ┣ 📜aboutme.component.html
 ┃ ┃ ┃ ┣ 📜aboutme.component.spec.ts
 ┃ ┃ ┃ ┗ 📜aboutme.component.ts
 ┃ ┃ ┣ 📂article-detail
 ┃ ┃ ┃ ┣ 📜article-detail.component.css
 ┃ ┃ ┃ ┣ 📜article-detail.component.html
 ┃ ┃ ┃ ┣ 📜article-detail.component.spec.ts
 ┃ ┃ ┃ ┗ 📜article-detail.component.ts
 ┃ ┃ ┣ 📂articles
 ┃ ┃ ┃ ┣ 📜articles.component.css
 ┃ ┃ ┃ ┣ 📜articles.component.html
 ┃ ┃ ┃ ┣ 📜articles.component.spec.ts
 ┃ ┃ ┃ ┗ 📜articles.component.ts
 ┃ ┃ ┣ 📂contact
 ┃ ┃ ┃ ┣ 📜contact.component.css
 ┃ ┃ ┃ ┣ 📜contact.component.html
 ┃ ┃ ┃ ┣ 📜contact.component.spec.ts
 ┃ ┃ ┃ ┗ 📜contact.component.ts
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┣ 📜home.component.css
 ┃ ┃ ┃ ┣ 📜home.component.html
 ┃ ┃ ┃ ┣ 📜home.component.spec.ts
 ┃ ┃ ┃ ┗ 📜home.component.ts
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┣ 📜login.component.css
 ┃ ┃ ┃ ┣ 📜login.component.html
 ┃ ┃ ┃ ┣ 📜login.component.spec.ts
 ┃ ┃ ┃ ┗ 📜login.component.ts
 ┃ ┃ ┣ 📂project-detail
 ┃ ┃ ┃ ┣ 📜project-detail.component.css
 ┃ ┃ ┃ ┣ 📜project-detail.component.html
 ┃ ┃ ┃ ┣ 📜project-detail.component.spec.ts
 ┃ ┃ ┃ ┗ 📜project-detail.component.ts
 ┃ ┃ ┣ 📂projects
 ┃ ┃ ┃ ┣ 📜projects.component.css
 ┃ ┃ ┃ ┣ 📜projects.component.html
 ┃ ┃ ┃ ┣ 📜projects.component.spec.ts
 ┃ ┃ ┃ ┗ 📜projects.component.ts
 ┃ ┃ ┗ 📂register
 ┃ ┃ ┃ ┣ 📜register.component.css
 ┃ ┃ ┃ ┣ 📜register.component.html
 ┃ ┃ ┃ ┣ 📜register.component.spec.ts
 ┃ ┃ ┃ ┗ 📜register.component.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜article.service.spec.ts
 ┃ ┃ ┣ 📜article.service.ts
 ┃ ┃ ┣ 📜auth.service.spec.ts
 ┃ ┃ ┣ 📜auth.service.ts
 ┃ ┃ ┣ 📜contact.service.spec.ts
 ┃ ┃ ┣ 📜contact.service.ts
 ┃ ┃ ┣ 📜date.service.spec.ts
 ┃ ┃ ┣ 📜date.service.ts
 ┃ ┃ ┣ 📜message.service.spec.ts
 ┃ ┃ ┣ 📜message.service.ts
 ┃ ┃ ┣ 📜project.service.spec.ts
 ┃ ┃ ┗ 📜project.service.ts
 ┃ ┣ 📜app.component.css
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.ts
 ┃ ┣ 📜app.config.server.ts
 ┃ ┣ 📜app.config.ts
 ┃ ┗ 📜app.routes.ts
 ┣ 📂assets
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜dalle.webp
 ┃ ┃ ┣ 📜gim.jpg
 ┃ ┃ ┣ 📜libro-react.png
 ┃ ┃ ┣ 📜portada-java-web.png
 ┃ ┃ ┣ 📜portada-js-web.png
 ┃ ┃ ┗ 📜usa.jpg
 ┃ ┣ 📜.gitkeep
 ┃ ┣ 📜articles.json
 ┃ ┣ 📜message.json
 ┃ ┣ 📜projects.json
 ┃ ┗ 📜simulacionBBDD.json
 ┣ 📜favicon.ico
 ┣ 📜index.html
 ┣ 📜main.server.ts
 ┣ 📜main.ts
 ┗ 📜styles.css


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
