package com.rebecaperez.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Clase de configuración para ajustes relacionados con la web.
 * Implementa {@link WebMvcConfigurer} para personalizar la configuración de Spring MVC, incluyendo el manejo de recursos estáticos.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

  /**
   * Configura los manejadores de recursos para servir archivos estáticos.
   * Mapea el patrón de URL "/uploads/**" al directorio "uploads" en el sistema de archivos.
   *
   * @param registry el {@link ResourceHandlerRegistry} usado para registrar manejadores de recursos
   */
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // Configura el manejador de recursos para servir archivos estáticos desde el directorio 'uploads'
    registry.addResourceHandler("/uploads/**")
      .addResourceLocations("file:uploads/");
  }

  /**
   * Proporciona un bean de {@link RestTemplate} para realizar peticiones HTTP.
   *
   * @return una nueva instancia de {@link RestTemplate}
   */
  @Bean
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}
