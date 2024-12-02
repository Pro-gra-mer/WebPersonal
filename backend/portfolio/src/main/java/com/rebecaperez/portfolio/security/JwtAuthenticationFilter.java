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
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final SecretKey secretKey;

  public JwtAuthenticationFilter() {
    // Carga la clave secreta directamente de las variables de entorno
    String encodedKey = System.getenv("JWT_SECRET_KEY");
    if (encodedKey == null || encodedKey.isEmpty()) {
      throw new IllegalStateException("JWT_SECRET_KEY no está configurada en las variables de entorno.");
    }
    this.secretKey = Keys.hmacShaKeyFor(encodedKey.getBytes());
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {
    String authorizationHeader = request.getHeader("Authorization");

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      String token = authorizationHeader.substring(7);
      try {
        Claims claims = Jwts.parserBuilder()
          .setSigningKey(secretKey)
          .build()
          .parseClaimsJws(token)
          .getBody();

        String email = claims.getSubject();
        String role = claims.get("role", String.class);

        if (email != null && role != null) {
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            email, null, Collections.singleton(() -> "ROLE_" + role));
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      } catch (Exception e) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
        return;
      }
    }

    chain.doFilter(request, response);
  }
}
