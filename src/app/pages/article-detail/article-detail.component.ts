import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent implements OnInit {
  article!: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.articleService.getArticle(id).subscribe((article) => {
      this.article = article;

      // Configurar el SEO en `<head>`
      this.title.setTitle(article.title);
      this.meta.updateTag({
        name: 'description',
        content: article.metaDescription,
      });
      this.meta.updateTag({ name: 'keywords', content: article.keyword });
    });
  }
}
