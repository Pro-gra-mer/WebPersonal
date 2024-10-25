import { Component } from '@angular/core';
import { ProyectsComponent } from '../../components/public/proyects/proyects.component';
import { ArticlesComponent } from '../../components/public/articles/articles.component';
import { CarouselComponent } from '../../components/public/carousel/carousel.component';
import { MessageFormComponent } from '../../components/user/message-form/message-form.component';
import { ProyectDetailComponent } from '../../components/public/proyect-detail/proyect-detail.component';
import { ArticleDetailComponent } from '../../components/public/article-detail/article-detail.component';
import { MessagesListComponent } from '../../components/public/messages-list/messages-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    ProyectsComponent,
    ArticlesComponent,
    MessageFormComponent,
    ProyectDetailComponent,
    ArticleDetailComponent,
    MessagesListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
