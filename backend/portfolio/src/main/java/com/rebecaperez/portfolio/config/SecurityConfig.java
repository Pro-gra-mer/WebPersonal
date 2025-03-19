package com.rebecaperez.portfolio.config;

import com.rebecaperez.portfolio.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Clase de configuración para ajustes de seguridad de Spring.
 * Define reglas de seguridad, configuración de CORS y codificación de contraseñas para la aplicación.
 */
@Configuration
public class SecurityConfig {

  /**
   * Configura las reglas de seguridad HTTP para la aplicación.
   * Establece autenticación, autorización, CORS y manejo de sesiones sin estado.
   *
   * @param http el objeto {@link HttpSecurity} para configurar ajustes de seguridad
   * @param jwtAuthenticationFilter el filtro JWT para autenticación basada en tokens
   * @return la cadena de filtros de seguridad configurada {@link SecurityFilterChain}
   * @throws Exception si ocurre un error durante la configuración
   */
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
    http
      // Desactiva CSRF para permitir solicitudes desde clientes externos
      .csrf(csrf -> csrf.disable())

      // Configura CORS para permitir solicitudes desde dominios específicos
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))

      // Define reglas de acceso para diferentes rutas
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/images/upload").hasRole("ADMIN") // Solo administradores pueden subir imágenes
        .requestMatchers(HttpMethod.GET, "/api/messages/**").permitAll() // Acceso público GET para mensajes
        .requestMatchers(HttpMethod.POST, "/messages/**").authenticated() // Usuarios autenticados pueden enviar mensajes
        .anyRequest().permitAll() // Permite acceso público a las demás rutas
      )

      // Configura la política de sesiones como sin estado (sin sesiones en el servidor)
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

      // Añade el filtro JWT antes del filtro de autenticación por usuario y contraseña
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  /**
   * Proporciona un codificador de contraseñas BCrypt para mayor seguridad.
   *
   * @return una instancia de {@link BCryptPasswordEncoder}
   */
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * Configura los ajustes de CORS para permitir solicitudes de origen cruzado desde el frontend.
   * Especifica orígenes permitidos, métodos, cabeceras y credenciales.
   *
   * @return una fuente de configuración CORS {@link CorsConfigurationSource} con los ajustes definidos
   */
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("https://rebecaperezportfolio.com", "https://www.rebecaperezportfolio.com")); // Dominios permitidos
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos HTTP permitidos
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Origin", "Accept")); // Cabeceras permitidas
    configuration.setExposedHeaders(List.of("Authorization")); // Cabeceras expuestas en las respuestas
    configuration.setAllowCredentials(true); // Permite el envío de cookies/autenticación
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
