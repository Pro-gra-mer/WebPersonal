package com.rebecaperez.portfolio.controller;

import com.rebecaperez.portfolio.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/images")
public class ImageUploadController {

  @Autowired
  private CloudinaryService cloudinaryService;

  @PostMapping("/upload")
  public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
    try {
      // Validar que el archivo no sea mayor a 5 MB
      if (file.getSize() > 5 * 1024 * 1024) {  // 5 MB
        return ResponseEntity.badRequest().body("El archivo no puede exceder los 5 MB.");
      }

      // Validar que el archivo sea una imagen
      if (!file.getContentType().startsWith("image")) {
        return ResponseEntity.badRequest().body("El archivo debe ser una imagen.");
      }

      // Subir imagen a Cloudinary
      String imageUrl = cloudinaryService.uploadFile(file);

      // Imprimir en los logs la URL de Cloudinary
      System.out.println("Cloudinary URL: " + imageUrl);

      // Devolver la URL pública en la respuesta
      return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error al subir la imagen: " + e.getMessage());
    }
  }

}
