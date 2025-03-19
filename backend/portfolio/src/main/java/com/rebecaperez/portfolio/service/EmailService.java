package com.rebecaperez.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Servicio para el envío de correos electrónicos.
 * <p>
 * Este servicio se utiliza para enviar mensajes de contacto al correo del administrador
 * y para enviar correos electrónicos genéricos a destinatarios específicos.
 * </p>
 */
@Service
public class EmailService {

  /**
   * Cliente para enviar correos electrónicos.
   */
  private final JavaMailSender mailSender;

  /**
   * Correo electrónico del administrador, obtenido de las propiedades de la aplicación.
   */
  @Value("${spring.mail.username}")
  private String adminEmail;

  /**
   * Constructor con inyección de dependencia del JavaMailSender.
   *
   * @param mailSender el cliente de envío de correos.
   */
  @Autowired
  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  /**
   * Envía un mensaje de contacto al correo del administrador.
   * <p>
   * Configura el correo con el asunto, el mensaje, el remitente y la dirección de respuesta,
   * y luego lo envía utilizando el JavaMailSender.
   * </p>
   *
   * @param name         el nombre del remitente.
   * @param userEmail    el correo electrónico del remitente.
   * @param subject      el asunto del correo.
   * @param messageBody  el contenido del mensaje.
   * @throws RuntimeException si ocurre un error al enviar el correo.
   */
  public void sendContactMessage(String name, String userEmail, String subject, String messageBody) {
    try {
      // Crear el objeto SimpleMailMessage que contendrá los datos del correo.
      SimpleMailMessage message = new SimpleMailMessage();

      // Configurar el correo:
      message.setTo(adminEmail);         // Destinatario es el administrador.
      message.setSubject(subject);         // Asunto del correo.
      message.setText(                   // Cuerpo del correo.
        "Has recibido un nuevo mensaje de contacto desde tu portfolio.\n\n" +
          "Nombre: " + name + "\n" +
          "Correo: " + userEmail + "\n\n" +
          "Mensaje:\n" + messageBody
      );
      message.setFrom(adminEmail);         // Correo de origen (administrador).
      message.setReplyTo(userEmail);         // Responder al remitente.

      // Enviar el correo utilizando el JavaMailSender.
      mailSender.send(message);
    } catch (MailException e) {
      // En caso de error, se lanza una RuntimeException con un mensaje descriptivo.
      throw new RuntimeException("Error al enviar el correo", e);
    }
  }

  /**
   * Envía un correo electrónico a un destinatario específico.
   * <p>
   * Este método configura y envía un correo utilizando el asunto y el mensaje proporcionados.
   * </p>
   *
   * @param to      el destinatario del correo.
   * @param subject el asunto del correo.
   * @param message el cuerpo del correo.
   */
  public void sendEmail(String to, String subject, String message) {
    // Crear y configurar el objeto SimpleMailMessage.
    SimpleMailMessage mailMessage = new SimpleMailMessage();
    mailMessage.setTo(to);         // Destinatario del correo.
    mailMessage.setSubject(subject); // Asunto del correo.
    mailMessage.setText(message);    // Cuerpo del correo.

    // Enviar el correo.
    mailSender.send(mailMessage);
  }
}
