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

  public CloudinaryService(
    @Value("${CLOUDINARY_CLOUD_NAME}") String cloudName,
    @Value("${CLOUDINARY_API_KEY}") String apiKey,
    @Value("${CLOUDINARY_API_SECRET}") String apiSecret) {
    this.cloudinary = new Cloudinary(ObjectUtils.asMap(
      "cloud_name", cloudName,
      "api_key", apiKey,
      "api_secret", apiSecret
    ));
  }


  public String uploadFile(MultipartFile file) throws IOException {
    Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
    return uploadResult.get("secure_url").toString(); // URL pública
  }
}
