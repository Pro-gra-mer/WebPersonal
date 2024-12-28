import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';
  private projectsSubject = new BehaviorSubject<Project[]>([]); // Estado centralizado
  projects$ = this.projectsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener proyectos y actualizar el estado centralizado
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      tap((projects) => this.projectsSubject.next(projects)) // Actualiza el estado
    );
  }

  // Obtener un proyecto por ID
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Crear un proyecto y actualizar el estado
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project).pipe(
      tap(() => this.refreshProjects()) // Refresca los proyectos
    );
  }

  // Actualizar un proyecto y refrescar el estado
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project).pipe(
      tap(() => this.refreshProjects()) // Refresca los proyectos
    );
  }

  // Eliminar un proyecto y actualizar el estado
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updatedProjects = this.projectsSubject
          .getValue()
          .filter((project) => project.id !== id);
        this.projectsSubject.next(updatedProjects); // Actualiza el estado
      })
    );
  }

  // Método para refrescar la lista de proyectos
  private refreshProjects(): void {
    this.getProjects().subscribe();
  }
}
