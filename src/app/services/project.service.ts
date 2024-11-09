// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; // URL base de tu API backend

  constructor(private http: HttpClient) {}

  // Método para obtener todos los proyectos
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Método para obtener un solo proyecto por ID
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo proyecto
  createProject(project: Project): Observable<Project> {
    const projectWithId = { ...project, id: Date.now() }; // Genera ID aquí
    return this.http.post<Project>(this.apiUrl, projectWithId);
  }
  // Método para actualizar un proyecto existente
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  // Método para eliminar un proyecto por ID
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
