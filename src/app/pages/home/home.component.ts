import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/public/projects/projects.component';
import { ArticlesComponent } from '../../components/public/articles/articles.component';
import { CarouselComponent } from '../../components/public/carousel/carousel.component';
import { MessageFormComponent } from '../../components/user/message-form/message-form.component';
import { MessagesListComponent } from '../../components/public/messages-list/messages-list.component';
import { SendMessageComponent } from '../../components/admin/send-message/send-message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    ProjectsComponent,
    ArticlesComponent,
    MessageFormComponent,
    MessagesListComponent,
    ProjectsComponent,
    SendMessageComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
