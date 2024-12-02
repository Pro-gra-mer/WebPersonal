package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  // Definimos una constante para el rol
  public static final String USER_ROLE = "USER";

  @Autowired
  public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  // Método para registrar un nuevo usuario
  public User registerNewUser(String username, String email, String password) {
    // Verificar si el email o el nombre de usuario ya existen
    if (emailExists(email)) {
      throw new RuntimeException("El correo electrónico ya está en uso.");
    }

    if (usernameExists(username)) {
      throw new RuntimeException("El nombre de usuario ya está en uso.");
    }

    // Cifrar la contraseña antes de almacenarla
    String encodedPassword = passwordEncoder.encode(password);

    // Crear un nuevo usuario y asignar los valores
    User user = new User();
    user.setUsername(username);  // Asignar nombre de usuario
    user.setEmail(email);        // Asignar correo electrónico
    user.setPassword(encodedPassword);  // Asignar la contraseña cifrada

    // Asigna un valor por defecto para el rol si es necesario
    user.setRole(USER_ROLE);  // El rol por defecto será "USER"

    // Guardar el usuario en la base de datos
    return userRepository.save(user);  // Guardamos el usuario en la base de datos
  }

  // Método para verificar si el email ya está registrado
  public boolean emailExists(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  // Método para verificar si el username ya está registrado
  public boolean usernameExists(String username) {
    return userRepository.findByUsername(username).isPresent();
  }

  // Método de autenticación para verificar la contraseña
  public User authenticate(String email, String password) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      // Verificar la contraseña con BCryptPasswordEncoder
      if (passwordEncoder.matches(password, user.getPassword())) {
        return user;  // Si la contraseña es correcta, retornamos el usuario
      }
    }
    return null; // Si no existe o la contraseña no coincide, retornamos null
  }
}
