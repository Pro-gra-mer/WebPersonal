package com.rebecaperez.portfolio.service;

import com.rebecaperez.portfolio.model.User;
import com.rebecaperez.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
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
    user.setUsername(username);  // Asegúrate de que el username se está asignando correctamente
    user.setEmail(email);        // Asegúrate de que el email se está asignando correctamente
    user.setPassword(encodedPassword);  // Asegúrate de que la contraseña se está cifrando correctamente

    // Asigna un valor por defecto para el rol si es necesario
    user.setRole("USER");  // El rol puede ser "USER" por defecto

    // Guardar el usuario en la base de datos
    return userRepository.save(user);  // Este método guardará el usuario en la base de datos
  }


  // Método para verificar si el email ya está registrado
  public boolean emailExists(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  // Método para verificar si el username ya está registrado
  public boolean usernameExists(String username) {
    return userRepository.findByUsername(username).isPresent();
  }

  public User authenticate(String email, String password) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      // Verificar la contraseña con BCryptPasswordEncoder
      if (passwordEncoder.matches(password, user.getPassword())) {
        return user;
      }
    }
    return null; // Si no existe o la contraseña no coincide, retornamos null
  }

}
