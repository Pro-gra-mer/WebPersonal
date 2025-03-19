package com.rebecaperez.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador REST para verificar el estado del servidor.
 * Proporciona un endpoint simple para confirmar que el servidor está activo.
 */
@RestController
public class PingController {

  /**
   * Verifica que el servidor esté activo.
   * Devuelve un mensaje indicando que el servidor está funcionando.
   *
   * @return una cadena de texto confirmando que el servidor está activo
   */
  @GetMapping("/ping")
  public String ping() {
    return "Server is active!";
  }
}
