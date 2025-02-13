# 🌐 Portfolio de Proyectos Personales

---

## 📖 Introducción

Este proyecto es una aplicación web para la gestión de proyectos, desarrollada con **Spring Boot 3** y **Java 21** para el backend, y **Angular 17** para el frontend. La aplicación permite a los usuarios autenticados enviar mensajes, mientras que solo la administradora tiene permisos para crear, editar y eliminar proyectos. 

El sistema está diseñado para garantizar seguridad y eficiencia, con una arquitectura robusta que facilita el manejo de roles y la administración de contenido de manera sencilla. A lo largo del desarrollo, se ha dado especial atención a la usabilidad, manteniendo un enfoque claro en la experiencia del usuario.

---

## ✨ Características Clave

### ✅ Autenticación de Usuarios
- Registro y autenticación obligatoria para acceder a funcionalidades avanzadas.
- Confirmación de cuenta a través de correo electrónico con MailSender.
- Seguridad reforzada para garantizar acceso seguro a la aplicación.

### ✅ Mensajería Dinámica
- Usuarios autenticados pueden enviar mensajes.
- El formulario captura automáticamente el nombre de usuario y habilita el botón "Enviar".

### ✅ Restablecimiento de Contraseña
- Formulario para solicitar restablecimiento de contraseña.
- Enlace seguro enviado por correo con MailSender.
- Proceso seguro que impide modificaciones no autorizadas de la contraseña.

### ✅ Formulario de Contacto
- Permite a los usuarios enviar mensajes al administrador.
- Envío de correos a través de MailSender para garantizar la entrega segura.

### ✅ Gestión de Proyectos
- La administradora puede crear, editar y eliminar proyectos.
- Acceso al Admin Dashboard desde la navbar.
- Formulario de subida de proyectos con Quill Editor.

### ✅ Persistencia en Base de Datos
- Datos almacenados en **MySQL** para garantizar gestión a largo plazo y escalabilidad.

---

## 🛠️ Herramientas y Tecnologías Utilizadas

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white) ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white) ![Quill Editor](https://img.shields.io/badge/Quill-Editor-00B0FF?style=flat&logo=quill&logoColor=white)<br>![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white) 
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) ![Render](https://img.shields.io/badge/Render-00979D?style=flat&logo=render&logoColor=white) ![Hostinger](https://img.shields.io/badge/Hostinger-673AB7?style=flat&logo=hostinger&logoColor=white)


### Backend
- **Spring Boot 3.3.7**: Desarrollo de backend escalable y de alto rendimiento.
- **Java 21**: Lenguaje de programación robusto y seguro.
- **Spring Security**: Autenticación y autorización con JWT.
- **Spring JPA**: Interacción con la base de datos mediante JPA.
- **MySQL**: Base de datos para almacenamiento de proyectos y usuarios.
- **MailSender**: Envío de correos para activación de cuenta y recuperación de contraseña.

### Frontend
- **Angular 17**: SPA con integración a APIs RESTful. 
- **Bootstrap 5**: Estilos y diseño responsivo.
- **Quill Editor**: Edición de contenido enriquecido.

### Otros
- **Cloudinary**: Almacenamiento y optimización de imágenes.
- **Postman**: Pruebas y validación de APIs RESTful.
- **Docker**: Contenerización para despliegue eficiente.
- **Render**: Plataforma de despliegue gratuita para el backend.
- **Hostinger**: Hosting del frontend y base de datos.

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/mi-web-personal.git
cd mi-web-personal
```

### 2. Instalar las dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
ng serve
```

### 4. Abrir el proyecto en el navegador
```
http://localhost:4200
```

---

## ⚙️ Configuración para Producción

### Configuración del Backend

1. Configurar las variables de entorno en `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=tu_contraseña
spring.mail.host=smtp.gmail.com
spring.mail.username=tu_correo@gmail.com
spring.mail.password=tu_contraseña
jwt.secret=tu_secreto
```

2. Ejecutar la aplicación backend:
```bash
mvn spring-boot:run
```

---

## 📄 Licencia

Este proyecto está bajo la **licencia MIT**. Puedes utilizarlo, modificarlo y distribuirlo libremente.

---

## 🧑‍💻 Autor

Desarrollado por **Rebeca Pérez**.

Si tienes dudas o sugerencias, ¡no dudes en contactarme!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/rebecaperez)  
[![Portfolio](https://img.shields.io/badge/Portfolio-Web-orange?style=flat&logo=google-chrome)](https://rebecaperezportfolio.com)

Si tienes dudas o sugerencias, ¡no dudes en contactarme!

---

## 🌟 Agradecimientos
- Angular
- Bootstrap
- Spring Boot
- ChatGPT

---

## 🔧 Desarrollo con Angular CLI

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.10.

### Servidor de desarrollo
Ejecuta `ng serve` para iniciar un servidor local y accede a `http://localhost:4200/`. La aplicación se recargará automáticamente al hacer cambios en los archivos fuente.

### Generación de código
Ejecuta `ng generate component nombre-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Construcción
Ejecuta `ng build` para construir el proyecto. Los archivos resultantes estarán en la carpeta `dist/`.

### Pruebas unitarias
Ejecuta `ng test` para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io).

### Pruebas end-to-end
Ejecuta `ng e2e` para pruebas end-to-end con la plataforma de tu elección.

### Más ayuda
Para más ayuda sobre Angular CLI, usa `ng help` o consulta la [documentación oficial](https://angular.io/cli).
