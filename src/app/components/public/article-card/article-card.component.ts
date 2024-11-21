import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateService } from '../../../services/date.service';
import { AuthService } from '../../../services/auth.service';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
  providers: [DateService],
})
export class ArticleCardComponent implements OnInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() publishDate!: Date;
  @Input() link!: string;

  formattedDate: string = '';
  isAdmin: boolean = false;

  constructor(
    private dateService: DateService,
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.formattedDate = this.dateService.transformDate(
      this.publishDate,
      'es-ES',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );

    this.isAdmin = this.authService.isAdmin();
  }

  // Función para eliminar el artículo
  deleteArticle(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      this.articleService.deleteArticle(this.id).subscribe(
        () => {
          alert('Artículo eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el artículo', error);
          alert('Error al eliminar el artículo');
        }
      );
    }
  }
}
