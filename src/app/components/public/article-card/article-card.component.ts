import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'; // Importa DatePipe

@Component({
  selector: 'app-article-card',
  standalone: true,
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
  imports: [DatePipe], // Incluye DatePipe aquí
})
export class ArticleCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() publishDate!: Date; // Asegúrate de tener esta propiedad como Date
  @Input() link!: string;

  isHovered = false;
}
