package com.rebecaperez.portfolio.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Servicio para interactuar con Cloudinary, permitiendo la subida de archivos a la nube.
 * <p>
 * Este servicio se configura utilizando la URL proporcionada en las propiedades de la aplicación,
 * y expone métodos para subir archivos (por ejemplo, imágenes) a Cloudinary y obtener la URL segura.
 * </p>
 */
@Service
public class CloudinaryService {

  /**
   * Instancia de Cloudinary configurada con la URL proporcionada.
   */
  private final Cloudinary cloudinary;

  /**
   * Constructor que inicializa el servicio de Cloudinary.
   *
   * @param cloudinaryUrl la URL de Cloudinary obtenida desde las propiedades de la aplicación.
   */
  public CloudinaryService(@Value("${CLOUDINARY_URL}") String cloudinaryUrl) {
    // Configura la instancia de Cloudinary utilizando la URL completa proporcionada.
    this.cloudinary = new Cloudinary(cloudinaryUrl);
  }

  /**
   * Sube un archivo a Cloudinary y retorna la URL segura de la imagen subida.
   *
   * @param file el archivo a subir, representado como MultipartFile.
   * @return la URL segura de la imagen en Cloudinary.
   * @throws IOException si ocurre un error durante la subida del archivo.
   */
  public String uploadFile(MultipartFile file) throws IOException {
    try {
      // Sube el archivo a Cloudinary y obtiene el resultado en un Map.
      Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
      // Retorna la URL segura de la imagen obtenida del resultado.
      return uploadResult.get("secure_url").toString();
    } catch (IOException e) {
      // Lanza una excepción de I/O con un mensaje descriptivo en caso de error.
      throw new IOException("Error al subir la imagen: " + e.getMessage());
    } catch (Exception e) {
      // Lanza una excepción general en caso de otro tipo de error.
      throw new RuntimeException("Error desconocido al subir la imagen: " + e.getMessage());
    }
  }
}
