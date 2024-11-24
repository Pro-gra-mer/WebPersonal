import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { ArticleCardComponent } from '../../components/public/article-card/article-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }
  // Función para manejar la eliminación de un proyecto
  onArticleDeleted(deletedId: number): void {
    // Filtramos el proyecto eliminado
    this.articles = this.articles.filter((article) => article.id !== deletedId);
  }
}
