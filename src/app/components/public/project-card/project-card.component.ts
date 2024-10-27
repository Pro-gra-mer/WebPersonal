import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common'; // Importa DatePipe

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() publishDate!: Date;
  @Input() link!: string;
}
