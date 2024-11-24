import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateService } from '../../../services/date.service';
import { AuthService } from '../../../services/auth.service';
import { ArticleService } from '../../../services/article.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  @Output() articleDeleted = new EventEmitter<number>();

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

  // Función para eliminar el artículo usando firstValueFrom
  async deleteArticle(): Promise<void> {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      try {
        await firstValueFrom(this.articleService.deleteArticle(this.id));
        alert('Artículo eliminado correctamente');
        // Redirigir a una ruta ficticia y luego a /articles
        this.articleDeleted.emit(this.id); // Emitimos el ID del proyecto eliminado
      } catch (error) {
        console.error('Error al eliminar el artículo', error);
        alert('Error al eliminar el artículo');
      }
    }
  }
}
