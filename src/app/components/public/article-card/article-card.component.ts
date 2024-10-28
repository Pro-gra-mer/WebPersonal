import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-article-card',
  standalone: true,
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
  providers: [DateService], // Incluye DateService aquí
})
export class ArticleCardComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() publishDate!: Date; // Publicación en formato Date
  @Input() link!: string;

  formattedDate: string = ''; // Variable para almacenar la fecha formateada
  isHovered = false;

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    // Formatea la fecha de publicación usando el servicio
    this.formattedDate = this.dateService.transformDate(
      this.publishDate,
      'es-ES',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );
  }
}
