package com.rebecaperez.portfolio.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

  private final Cloudinary cloudinary;

  public CloudinaryService(@Value("${CLOUDINARY_URL}") String cloudinaryUrl) {
    // Usamos la URL completa de Cloudinary para configurar el cliente
    this.cloudinary = new Cloudinary(cloudinaryUrl);
  }

  public String uploadFile(MultipartFile file) throws IOException {
    try {
      Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
      return uploadResult.get("secure_url").toString();
    } catch (IOException e) {
      throw new IOException("Error al subir la imagen: " + e.getMessage());
    } catch (Exception e) {
      throw new RuntimeException("Error desconocido al subir la imagen: " + e.getMessage());
    }

  }
}
