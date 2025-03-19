package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para gestionar usuarios.
 * Proporciona endpoints relacionados con la gestión de usuarios a través del servicio {@link UserService}.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  /**
   * Constructor del controlador de usuarios con inyección de dependencia.
   *
   * @param userService el servicio de usuarios {@link UserService} para realizar operaciones relacionadas con usuarios
   */
  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }
}
