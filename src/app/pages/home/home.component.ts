import { Component } from '@angular/core';
import { LastProjectsComponent } from '../../components/public/last-projects/last-projects.component';
import { LastArticlesComponent } from '../../components/public/last-articles/last-articles.component';
import { CarouselComponent } from '../../components/public/carousel/carousel.component';
import { MessagesListComponent } from '../../components/public/messages-list/messages-list.component';
import { SendMessageComponent } from '../../components/admin/send-message/send-message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    LastArticlesComponent,
    LastProjectsComponent,
    MessagesListComponent,
    SendMessageComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
