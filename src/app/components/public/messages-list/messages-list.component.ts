import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from '../../../services/date.service';
import { Message } from '../../../models/message.model';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule],
  providers: [DateService],
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'],
})
export class MessagesListComponent implements OnInit {
  messages: Message[] = []; // Todos los mensajes
  displayedMessages: Message[] = []; // Mensajes mostrados en pantalla
  messagesLimit = 5; // Mostrar inicialmente 5 mensajes

  constructor(
    private dateService: DateService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((messages) => {
      this.messages = messages.map((msg) => ({
        ...msg,
        formattedDate: this.dateService.transformDate(msg.date),
      }));
      this.displayedMessages = this.messages.slice(0, this.messagesLimit);
    });
  }

  // Método para cargar más mensajes
  loadMoreMessages(): void {
    this.messagesLimit += 5;
    this.displayedMessages = this.messages.slice(0, this.messagesLimit);
  }
}
