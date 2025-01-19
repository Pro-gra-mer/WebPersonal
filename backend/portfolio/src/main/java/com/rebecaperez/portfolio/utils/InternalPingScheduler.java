package com.rebecaperez.portfolio.utils;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class InternalPingScheduler {

  private final RestTemplate restTemplate;
  private static final String PING_URL = "https://portfolio-backend-latest-veuz.onrender.com/ping";

  // Variable para almacenar el último intervalo calculado
  private long lastPingTime = System.currentTimeMillis();

  public InternalPingScheduler(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  // Se ejecuta inicialmente con un retraso de 3 segundos
  @Scheduled(initialDelay = 3000, fixedRate = Long.MAX_VALUE)  // No vuelve a ejecutarse automáticamente
  public void sendInitialPing() {
    sendPing();
  }

  // Método que maneja la lógica del ping y el cálculo del siguiente intervalo
  private void sendPing() {
    try {
      // Realizamos el ping al servidor
      String response = restTemplate.getForObject(PING_URL, String.class);
      System.out.println("Ping exitoso: " + response);

      // Calculamos un intervalo aleatorio entre 3 y 15 minutos (excluyendo el ping actual)
      long delay = ThreadLocalRandom.current().nextLong(180000, 900000); // Entre 3 y 15 minutos
      System.out.println("Esperando " + delay / 60000 + " minutos para el siguiente ping.");

      // Calculamos cuánto tiempo ha pasado desde el último ping
      long timePassed = System.currentTimeMillis() - lastPingTime;
      long timeToWait = delay - timePassed;

      if (timeToWait > 0) {
        // Si el tiempo restante es positivo, esperamos antes de ejecutar el siguiente ping
        Thread.sleep(timeToWait);
      }

      // Actualizamos el último tiempo del ping
      lastPingTime = System.currentTimeMillis();

      // Llamamos a sendPing de nuevo con el intervalo calculado
      sendPing();
    } catch (Exception e) {
      System.err.println("Ping ha fallado: " + e.getMessage());
    }
  }
}
