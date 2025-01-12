# Usa una imagen base de Java
FROM openjdk:21-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo JAR de la aplicación
COPY target/portfolio-0.0.1-SNAPSHOT.jar ./portfolio.jar

# Expone el puerto
EXPOSE 9090

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "portfolio.jar"]


