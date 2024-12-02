package com.rebecaperez.portfolio.dto;

import java.time.LocalDateTime;

public class MessageResponse {
  private Long id;
  private String content;
  private LocalDateTime date;
  private String senderEmail; // Email del usuario, sin datos sensibles

  public MessageResponse(Long id, String content, LocalDateTime date, String senderEmail) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.senderEmail = senderEmail;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public LocalDateTime getDate() {
    return date;
  }

  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  public String getSenderEmail() {
    return senderEmail;
  }

  public void setSenderEmail(String senderEmail) {
    this.senderEmail = senderEmail;
  }

}
