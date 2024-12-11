package com.rebecaperez.portfolio.service;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private final JavaMailSender mailSender;

  @Value("${spring.mail.username}")
  private String adminEmail; // El correo del administrador

  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  public void sendContactMessage(String name, String userEmail, String subject, String messageBody) {
    try {
      SimpleMailMessage message = new SimpleMailMessage();

      // Configurar el correo
      message.setTo(adminEmail); // Destinatario es el administrador
      message.setSubject(subject);
      message.setText(
        "Has recibido un nuevo mensaje de contacto desde tu portfolio.\n\n" +
          "Nombre: " + name + "\n" +
          "Correo: " + userEmail + "\n\n" +
          "Mensaje:\n" + messageBody
      );
      message.setFrom(adminEmail); // Correo de origen
      message.setReplyTo(userEmail); // Responder al remitente

      // Enviar el correo
      mailSender.send(message);
    } catch (MailException e) {
      throw new RuntimeException("Error al enviar el correo", e);
    }
  }
}
