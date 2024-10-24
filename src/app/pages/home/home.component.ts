import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { ArticlesComponent } from '../../components/articles/articles.component';
import { ProyectsComponent } from '../../components/proyects/proyects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent, ArticlesComponent, ProyectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
