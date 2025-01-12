package com.rebecaperez.portfolio.config;

import com.rebecaperez.portfolio.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

  // Configura reglas de seguridad HTTP para la aplicación
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
    http
      // Desactiva CSRF para facilitar las solicitudes desde clientes externos
      .csrf(csrf -> csrf.disable())

      // Configura CORS para permitir solicitudes desde dominios específicos
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))

      // Define reglas de acceso para diferentes rutas
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/images/upload").hasRole("ADMIN") // Solo administradores pueden subir imágenes
        .requestMatchers("/messages/**").authenticated() // Solo usuarios autenticados pueden acceder a mensajes
        .anyRequest().permitAll() // Permite el acceso público a las demás rutas
      )

      // Configura la política de sesión como STATELESS (sin mantener sesiones en el servidor)
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

      // Añade el filtro JWT antes del filtro de autenticación de usuario y contraseña
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  // Configura BCrypt como codificador de contraseñas para mayor seguridad
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // Configura CORS para permitir solicitudes desde el frontend (modificar para producción)
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("https://rebecaperezportfolio.com", "http://localhost:8080")); // Dominios permitidos
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos HTTP permitidos
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Headers permitidos
    configuration.setExposedHeaders(List.of("Authorization")); // Headers expuestos en las respuestas
    configuration.setAllowCredentials(true); // Permitir el envío de cookies/autenticación
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
