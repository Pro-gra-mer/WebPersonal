import { Component } from '@angular/core';
import { ProyectsComponent } from '../../components/proyects/proyects.component';
import { ArticlesComponent } from '../../components/articles/articles.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, ProyectsComponent, ArticlesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
