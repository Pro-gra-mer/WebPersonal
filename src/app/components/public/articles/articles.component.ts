import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor y *ngIf
import { ArticleCardComponent } from '../article-card/article-card.component';

interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  lastUpdated: string;
  publishDate: Date;
  link: string;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
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
      lastUpdated: '3 mins ago',
      publishDate: new Date('2023-10-01'),
      link: '/articles/1',
    },
    {
      id: 2,
      title: 'Mock Article 2',
      description: 'Description for mock article 2',
      imageUrl: 'assets/images/dalle.webp',
      lastUpdated: '10 mins ago',
      publishDate: new Date('2023-09-20'),
      link: '/articles/2',
    },
    {
      id: 3,
      title: 'Mock Article 3',
      description: 'Description for mock article 3',
      imageUrl: 'assets/images/dalle.webp',
      lastUpdated: '1 hour ago',
      publishDate: new Date('2023-08-15'),
      link: '/articles/3',
    },
  ];

  latestArticles: Article[] = []; // Array vacío para rellenar con los últimos 3 artículos

  ngOnInit() {
    // Toma solo los últimos 3 artículos
    this.latestArticles = this.allArticles.slice(-3);
  }
}
