import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { ArticleCardComponent } from '../article-card/article-card.component';
import localeEs from '@angular/common/locales/es'; // Importa el locale español

interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publishDate: Date;
  link: string;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, DatePipe, ArticleCardComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  // Lista ficticia de artículos con links dinámicos
  allArticles: Article[] = [
    {
      id: 1,
      title: 'Mock Article 1',
      description: 'Description for mock article 1',
      imageUrl: 'assets/images/dalle.webp',
      publishDate: new Date('2023-10-01'),
      link: '/articles/1',
    },
    {
      id: 2,
      title: 'Mock Article 2',
      description: 'Description for mock article 2',
      imageUrl: 'assets/images/dalle.webp',
      publishDate: new Date('2023-09-20'),
      link: '/articles/2',
    },
    {
      id: 3,
      title: 'Mock Article 3',
      description: 'Description for mock article 3',
      imageUrl: 'assets/images/dalle.webp',
      publishDate: new Date('2023-08-15'),
      link: '/articles/3',
    },
  ];

  latestArticles: Article[] = []; // Array vacío para rellenar con los últimos 3 artículos

  constructor() {
    // Registra el locale español para toda la aplicación
    registerLocaleData(localeEs, 'es');
  }

  ngOnInit() {
    // Toma solo los últimos 3 artículos
    this.latestArticles = this.allArticles.slice(-3);
  }
}
