import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'app-last-articles',
  standalone: true,
  imports: [RouterLink, CommonModule, ArticleCardComponent],
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.css'],
})
export class LastArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((articles) => {
      // Filtra los tres últimos artículos
      this.articles = articles.slice(-3).reverse();
    });
  }
}
