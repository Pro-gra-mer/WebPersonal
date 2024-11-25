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
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

  // The secret key should be stored in environment variables
  private final String secretKey = System.getenv("JWT_SECRET_KEY");

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {
    String authorizationHeader = request.getHeader("Authorization");

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      String token = authorizationHeader.substring(7);
      try {
        // Create a secure key from the secret
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

        // Use the new parser builder pattern
        Claims claims = Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token)
          .getBody();

        String email = claims.getSubject(); // Use email as the subject
        String role = claims.get("role", String.class);

        if (email != null && role != null) {
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            email, // Use email as the principal
            null,
            Collections.singleton(() -> "ROLE_" + role) // Assign role as authority
          );
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
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
