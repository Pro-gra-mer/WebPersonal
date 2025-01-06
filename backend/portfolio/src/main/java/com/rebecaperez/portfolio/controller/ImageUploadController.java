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
      // Subir imagen a Cloudinary
      String imageUrl = cloudinaryService.uploadFile(file);

      // Devolver la URL pública en la respuesta
      return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error al subir la imagen: " + e.getMessage());
    }
  }
}
