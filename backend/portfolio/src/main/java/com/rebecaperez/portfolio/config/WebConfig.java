package com.rebecaperez.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // Configura el manejador de recursos para servir archivos estáticos desde el directorio 'uploads'
    registry.addResourceHandler("/uploads/**")
      .addResourceLocations("file:uploads/");
  }
}