package com.rebecaperez.portfolio.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Collections;

/**
 * Filtro de autenticación que se ejecuta una sola vez por cada solicitud.
 * <p>
 * Este filtro se encarga de extraer y validar el token JWT del encabezado Authorization,
 * estableciendo la autenticación en el contexto de seguridad de Spring si el token es válido.
 * </p>
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  /**
   * Clave secreta utilizada para validar el JWT.
   */
  private final SecretKey secretKey;

  /**
   * Constructor del filtro que inicializa la clave secreta a partir de la variable de entorno.
   * <p>
   * Si la variable de entorno <code>JWT_SECRET_KEY</code> no está configurada, se lanza una excepción.
   * </p>
   */
  public JwtAuthenticationFilter() {
    // Se obtiene la clave secreta desde las variables de entorno
    String encodedKey = System.getenv("JWT_SECRET_KEY");
    if (encodedKey == null || encodedKey.isEmpty()) {
      throw new IllegalStateException("JWT_SECRET_KEY no está configurada en las variables de entorno.");
    }
    // Se genera la clave secreta usando el algoritmo HMAC
    this.secretKey = Keys.hmacShaKeyFor(encodedKey.getBytes());
  }

  /**
   * Procesa la solicitud HTTP, extrayendo y validando el token JWT del encabezado Authorization.
   * <p>
   * Si el token es válido, se establece la autenticación en el contexto de seguridad de Spring.
   * En caso de error (token inválido, expirado, etc.), se envía un error 401 Unauthorized.
   * </p>
   *
   * @param request  la solicitud HTTP.
   * @param response la respuesta HTTP.
   * @param chain    la cadena de filtros.
   * @throws ServletException si ocurre un error en el procesamiento del filtro.
   * @throws IOException      si ocurre un error de entrada/salida.
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {

    // Se obtiene el encabezado Authorization de la solicitud HTTP
    String authorizationHeader = request.getHeader("Authorization");

    // Verifica que el encabezado no sea nulo y que inicie con "Bearer "
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      // Extrae el token JWT (omite el prefijo "Bearer ")
      String token = authorizationHeader.substring(7);
      try {
        // Se parsea y valida el token utilizando la clave secreta
        Claims claims = Jwts.parserBuilder()
          .setSigningKey(secretKey)
          .build()
          .parseClaimsJws(token)
          .getBody();

        // Se obtiene el email (subject) y el rol del usuario a partir del token
        String email = claims.getSubject();
        String role = claims.get("role", String.class);

        // Si el email y el rol son válidos, se crea un objeto de autenticación
        if (email != null && role != null) {
          // Se establece el rol agregando el prefijo "ROLE_"
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            email, null, Collections.singleton(() -> "ROLE_" + role));
          // Se establece la autenticación en el contexto de seguridad de Spring
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      } catch (Exception e) {
        // Si ocurre algún error (token inválido, expirado, etc.), se envía un error 401 Unauthorized
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
        return;
      }
    }
    // Continúa con el siguiente filtro en la cadena
    chain.doFilter(request, response);
  }
}
