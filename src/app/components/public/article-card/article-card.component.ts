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
  confirmingDelete: boolean = false; // Estado para mostrar la confirmación

  @Output() articleDeleted = new EventEmitter<number>(); // Output para emitir el ID eliminado

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

  confirmDelete(): void {
    this.confirmingDelete = true; // Activar estado de confirmación
  }

  cancelDelete(): void {
    this.confirmingDelete = false; // Cancelar el estado de confirmación
  }
  // Función para eliminar el artículo usando firstValueFrom
  async deleteArticle(): Promise<void> {
    try {
      await firstValueFrom(this.articleService.deleteArticle(this.id));
      this.articleDeleted.emit(this.id); // Emitimos el ID del artículo eliminado
    } catch (error) {
      console.error('Error al eliminar el artículo', error);
      alert('Error al eliminar el artículo');
    } finally {
      this.confirmingDelete = false; // Restablecer estado de confirmación
    }
  }
}
