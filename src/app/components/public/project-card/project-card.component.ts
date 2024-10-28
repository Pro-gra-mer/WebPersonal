import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateService } from '../../../services/date.service'; // Importa DateService

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  providers: [DateService], // Añade DateService a providers
})
export class ProjectCardComponent implements OnInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() publishDate!: Date; // Fecha de publicación
  @Input() link!: string;

  formattedDate: string = ''; // Propiedad para almacenar la fecha formateada

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    // Usa DateService para formatear publishDate
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
