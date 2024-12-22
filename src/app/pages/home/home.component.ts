import { Component } from '@angular/core';
import { LastProjectsComponent } from '../../components/public/last-projects/last-projects.component';
import { CarouselComponent } from '../../components/public/carousel/carousel.component';
import { MessagesListComponent } from '../../components/public/messages-list/messages-list.component';
import { MessageComponent } from '../../components/shared/message/message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    LastProjectsComponent,
    MessagesListComponent,
    MessageComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
