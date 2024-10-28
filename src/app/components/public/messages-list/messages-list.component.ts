import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from '../../../services/date.service';

interface Message {
  user: string;
  content: string;
  date: Date;
  formattedDate?: string;
}

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule],
  providers: [DateService],
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'],
})
export class MessagesListComponent implements OnInit {
  messages: Message[] = [
    { user: 'Usuario1', content: 'Mensaje de ejemplo 1', date: new Date() },
    { user: 'Usuario2', content: 'Mensaje de ejemplo 2', date: new Date() },
  ];

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.messages = this.messages.map((msg) => {
      const formattedDate = this.dateService.transformDate(msg.date, 'es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return { ...msg, formattedDate };
    });
  }
}
