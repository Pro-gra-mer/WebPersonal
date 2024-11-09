// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/articles'; // URL base de tu API backend

  constructor(private http: HttpClient) {}

  // Método para obtener todos los artículos
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  // Método para obtener un solo artículo por ID
  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo artículo
  createArticle(article: Article): Observable<Article> {
    const articleWithId = { ...article, id: Date.now() }; // Asigna un ID único aquí
    return this.http.post<Article>(this.apiUrl, articleWithId);
  }

  // Método para actualizar un artículo existente
  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  // Método para eliminar un artículo por ID
  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
