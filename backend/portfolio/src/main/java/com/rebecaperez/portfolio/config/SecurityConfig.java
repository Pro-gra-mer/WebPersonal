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

  // Configura las reglas de seguridad HTTP, incluyendo CSRF, CORS, permisos y el filtro JWT
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
    http.csrf(csrf -> csrf.disable()) // Desactiva CSRF (solo para APIs públicas o desarrollo)
      .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configura CORS
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/images/upload").hasRole("ADMIN") // Solo admin puede subir imágenes
        .requestMatchers("/messages/**").authenticated() // Protege rutas de mensajes
        .anyRequest().permitAll() // Permite acceso público a otras rutas
      )
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sin sesiones
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Añade el filtro JWT
    return http.build();
  }

  // Configura un codificador de contraseñas utilizando BCrypt
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // Configura el origen de CORS para permitir solicitudes desde el frontend local
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:4200")); // Permite el frontend local
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos permitidos
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Headers permitidos
    configuration.setExposedHeaders(List.of("Authorization")); // Opcional, si necesitas exponer algún header
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
