package com.rebecaperez.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
public class ImageUploadController {

  private final String uploadDir = "uploads/";

  @PostMapping("/upload")
  public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
    try {
      // Crear directorio si no existe
      Path uploadPath = Path.of(uploadDir);
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
      }

      // Guardar archivo
      String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
      Path filePath = uploadPath.resolve(fileName);
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

      // Generar URL de acceso
      String imageUrl = "/uploads/" + fileName;

      // Devolver la URL en la respuesta
      return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error al subir la imagen: " + e.getMessage());
    }
  }
}
