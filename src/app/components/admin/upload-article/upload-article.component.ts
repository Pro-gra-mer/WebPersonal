// src/app/components/admin/upload-article/upload-article.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-upload-article',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-article.component.html',
  styleUrls: ['./upload-article.component.css'],
})
export class UploadArticleComponent {
  article: Article = {
    id: 0,
    title: '',
    content: '',
    publishDate: new Date(),
    imageUrl: '',
    slug: '', // URL amigable para el artículo
    metaDescription: '', // Breve descripción para SEO
    keyword: '', // Palabra clave principal para SEO
  };

  constructor(private articleService: ArticleService) {}

  onSubmit(): void {
    this.articleService.createArticle(this.article).subscribe(
      (response) => {
        console.log('Artículo subido:', response);

        // Reinicia el formulario después de enviar el artículo
        this.article = {
          id: 0,
          title: '',
          content: '',
          publishDate: new Date(),
          imageUrl: '',
          slug: '', // URL amigable para el artículo
          metaDescription: '', // Breve descripción para SEO
          keyword: '', // Palabra clave principal para SEO
        };
      },
      (error) => {
        console.error('Error al subir el artículo:', error);
      }
    );
  }
}
