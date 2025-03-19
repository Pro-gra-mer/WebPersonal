package com.rebecaperez.portfolio.utils;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.ThreadLocalRandom;

/**
 * Componente que envía pings internos al servidor para mantener la aplicación "viva"
 * o para comprobar su estado. Utiliza un intervalo aleatorio entre pings (entre 3 y 15 minutos)
 * para evitar sobrecargar el servidor.
 */
@Component
public class InternalPingScheduler {

  /**
   * Cliente HTTP para realizar solicitudes al servidor.
   */
  private final RestTemplate restTemplate;

  /**
   * URL a la que se envía el ping.
   */
  private static final String PING_URL = "https://portfolio-backend-latest-veuz.onrender.com/ping";

  /**
   * Almacena el tiempo (en milisegundos) del último ping realizado.
   */
  private long lastPingTime = System.currentTimeMillis();

  /**
   * Constructor que inyecta el RestTemplate.
   *
   * @param restTemplate el cliente HTTP a utilizar para enviar los pings.
   */
  public InternalPingScheduler(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  /**
   * Método programado que se ejecuta inicialmente con un retraso de 3 segundos.
   * <p>
   * Se configura con un fixedRate muy alto (Long.MAX_VALUE) para que no se ejecute automáticamente
   * nuevamente, ya que el método sendPing se encarga de reprogramar los siguientes pings.
   * </p>
   */
  @Scheduled(initialDelay = 3000, fixedRate = Long.MAX_VALUE)
  public void sendInitialPing() {
    sendPing();
  }

  /**
   * Realiza el envío de un ping al servidor y calcula el siguiente intervalo de espera.
   * <p>
   * Este método realiza una solicitud GET a la URL de ping, imprime el resultado y, a continuación,
   * calcula un intervalo aleatorio entre 3 y 15 minutos. Si el tiempo transcurrido desde el último ping
   * es menor que el intervalo calculado, espera el tiempo restante antes de enviar el siguiente ping.
   * Finalmente, actualiza el tiempo del último ping y vuelve a llamar a sí mismo recursivamente.
   * </p>
   */
  private void sendPing() {
    try {
      // Realiza el ping al servidor y obtiene la respuesta
      String response = restTemplate.getForObject(PING_URL, String.class);
      System.out.println("Ping exitoso: " + response);

      // Calcula un intervalo aleatorio entre 3 y 15 minutos (en milisegundos)
      long delay = ThreadLocalRandom.current().nextLong(180000, 900000); // Entre 3 y 15 minutos
      System.out.println("Esperando " + delay / 60000 + " minutos para el siguiente ping.");

      // Calcula el tiempo transcurrido desde el último ping
      long timePassed = System.currentTimeMillis() - lastPingTime;
      // Calcula el tiempo a esperar restando el tiempo transcurrido del intervalo aleatorio
      long timeToWait = delay - timePassed;

      if (timeToWait > 0) {
        // Espera el tiempo restante antes de ejecutar el siguiente ping
        Thread.sleep(timeToWait);
      }

      // Actualiza el tiempo del último ping
      lastPingTime = System.currentTimeMillis();

      // Llama de nuevo a sendPing para continuar con el ciclo de pings
      sendPing();
    } catch (Exception e) {
      // Si ocurre un error en el envío del ping, se imprime el mensaje de error
      System.err.println("Ping ha fallado: " + e.getMessage());
    }
  }
}
