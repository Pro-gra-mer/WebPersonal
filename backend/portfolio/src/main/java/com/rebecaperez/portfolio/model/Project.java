package com.rebecaperez.portfolio.model;

import jakarta.persistence.*;
import java.util.Date;

/**
 * Representa un proyecto en el portfolio.
 * <p>
 * Esta entidad se mapea con la tabla <i>projects</i> y contiene información detallada sobre un proyecto,
 * como su título, descripción, contenido extenso, fecha de publicación e imagen representativa.
 * </p>
 */
@Entity
@Table(name = "projects")
public class Project {

  /**
   * Identificador único del proyecto.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Título del proyecto.
   */
  private String title;

  /**
   * Descripción del proyecto (máximo 1000 caracteres).
   */
  @Column(length = 1000)
  private String description;

  /**
   * Contenido extenso del proyecto, almacenado como LOB (Large Object).
   */
  @Lob
  private String content;

  /**
   * Fecha y hora de publicación del proyecto.
   */
  @Temporal(TemporalType.TIMESTAMP)
  private Date publishDate;

  /**
   * URL de la imagen representativa del proyecto.
   */
  private String imageUrl;

  /**
   * Constructor por defecto.
   */
  public Project() {}

  /**
   * Obtiene el identificador único del proyecto.
   *
   * @return el ID del proyecto.
   */
  public Long getId() {
    return id;
  }

  /**
   * Establece el identificador único del proyecto.
   *
   * @param id el ID a asignar.
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Obtiene el título del proyecto.
   *
   * @return el título del proyecto.
   */
  public String getTitle() {
    return title;
  }

  /**
   * Establece el título del proyecto.
   *
   * @param title el título a asignar.
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * Obtiene la descripción del proyecto.
   *
   * @return la descripción del proyecto.
   */
  public String getDescription() {
    return description;
  }

  /**
   * Establece la descripción del proyecto.
   *
   * @param description la descripción a asignar.
   */
  public void setDescription(String description) {
    this.description = description;
  }

  /**
   * Obtiene el contenido extenso del proyecto.
   *
   * @return el contenido del proyecto.
   */
  public String getContent() {
    return content;
  }

  /**
   * Establece el contenido extenso del proyecto.
   *
   * @param content el contenido a asignar.
   */
  public void setContent(String content) {
    this.content = content;
  }

  /**
   * Obtiene la fecha y hora de publicación del proyecto.
   *
   * @return la fecha de publicación.
   */
  public Date getPublishDate() {
    return publishDate;
  }

  /**
   * Establece la fecha y hora de publicación del proyecto.
   *
   * @param publishDate la fecha a asignar.
   */
  public void setPublishDate(Date publishDate) {
    this.publishDate = publishDate;
  }

  /**
   * Obtiene la URL de la imagen representativa del proyecto.
   *
   * @return la URL de la imagen.
   */
  public String getImageUrl() {
    return imageUrl;
  }

  /**
   * Establece la URL de la imagen representativa del proyecto.
   *
   * @param imageUrl la URL a asignar.
   */
  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
