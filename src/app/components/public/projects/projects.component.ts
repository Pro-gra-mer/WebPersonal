import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor y *ngIf
import { ProjectCardComponent } from '../project-card/project-card.component';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publishDate: Date;
  link: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
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

  ngOnInit() {
    // Toma solo los últimos 3 proyectos
    this.latestProjects = this.allProjects.slice(-3);
  }
}
