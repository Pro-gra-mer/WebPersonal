// src/app/components/admin/upload-article/upload-article.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Article, Section } from '../../../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-article',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upload-article.component.html',
  styleUrls: ['./upload-article.component.css'],
})
export class UploadArticleComponent {
  article: Article = {
    id: 0,
    title: '',
    content: [], // Inicializa como un arreglo vacío
    publishDate: new Date(),
    imageUrl: '',
    slug: '',
    metaDescription: '',
    keyword: '',
  };

  constructor(private articleService: ArticleService) {}

  addSection(): void {
    this.article.content.push({ heading: '', paragraph: '' });
  }

  removeSection(index: number): void {
    this.article.content.splice(index, 1);
  }

  onSubmit(): void {
    this.articleService.createArticle(this.article).subscribe(
      (response) => {
        console.log('Artículo subido:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error al subir el artículo:', error);
      }
    );
  }

  private resetForm(): void {
    this.article = {
      id: 0,
      title: '',
      content: [],
      publishDate: new Date(),
      imageUrl: '',
      slug: '',
      metaDescription: '',
      keyword: '',
    };
  }
}
