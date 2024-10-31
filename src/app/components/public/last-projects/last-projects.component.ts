import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common'; // Para usar *ngFor y *ngIf
import { ProjectCardComponent } from '../project-card/project-card.component';
import { RouterModule } from '@angular/router';
import localeEs from '@angular/common/locales/es'; // Importa el locale español

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publishDate: Date;
  link: string;
}

@Component({
  selector: 'app-last-projects',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe, ProjectCardComponent],
  templateUrl: './last-projects.component.html',
  styleUrls: ['./last-projects.component.css'],
})
export class LastProjectsComponent implements OnInit {
  // Lista ficticia de proyectos con links y publishDate
  allProjects: Project[] = [
    {
      id: 1,
      title: 'Mock Project 1',
      description: 'Description for mock project 1',
      imageUrl: 'assets/images/dalle.webp',
      publishDate: new Date('2023-09-01'),
      link: '/projects/1',
    },
    {
      id: 2,
      title: 'Mock Project 2',
      description: 'Description for mock project 2',
      imageUrl: 'assets/images/dalle.webp',
      publishDate: new Date('2023-08-20'),
      link: '/projects/2',
    },
    {
      id: 3,
      title: 'Mock Project 3',
      description: 'Description for mock project 3',
      imageUrl: 'assets/images/dalle.webp',
      publishDate: new Date('2023-07-15'),
      link: '/projects/3',
    },
  ];

  latestProjects: Project[] = []; // Array vacío para rellenar con los últimos 3 proyectos
  constructor() {
    // Registra el locale español para toda la aplicación
    registerLocaleData(localeEs, 'es');
  }

  ngOnInit() {
    // Toma solo los últimos 3 proyectos
    this.latestProjects = this.allProjects.slice(-3);
  }
}
