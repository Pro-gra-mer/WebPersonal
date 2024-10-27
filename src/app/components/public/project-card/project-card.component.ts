import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterModule],
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
