import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from '../../../services/date.service';
import { Message } from '../../../models/message.model';
import { MessageService } from '../../../services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule],
  providers: [DateService],
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'],
})
export class MessagesListComponent implements OnInit, OnDestroy {
  messages: Message[] = []; // Todos los mensajes cargados desde el servicio
  displayedMessages: Message[] = []; // Mensajes visibles en la interfaz
  messagesLimit = 5; // Límite de mensajes mostrados inicialmente
  errorMessage: string | null = null; // Mensaje de error para mostrar al usuario
  private destroy$ = new Subject<void>(); // Permite limpiar suscripciones al destruir el componente
  private isLoading = false; // Indica si se está cargando más contenido

  constructor(
    private dateService: DateService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Escucha los mensajes del servicio y formatea la fecha de cada uno
    this.messageService.messages$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (messages) => {
        this.messages = messages.map((msg) => ({
          ...msg,
          formattedDate: this.dateService.transformDate(msg.date),
        }));
        this.updateDisplayedMessages(); // Actualiza los mensajes visibles
        this.cd.detectChanges(); // Fuerza la detección de cambios
      },
      error: () => {
        this.errorMessage = 'Error al cargar los mensajes. Intenta nuevamente.';
      },
    });
  }

  ngOnDestroy(): void {
    // Limpia las suscripciones para evitar fugas de memoria
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateDisplayedMessages(): void {
    // Actualiza los mensajes visibles según el límite
    this.displayedMessages = this.messages.slice(0, this.messagesLimit);
  }

  loadMoreMessages(): void {
    if (this.isLoading) return; // Evita múltiples cargas simultáneas

    try {
      this.isLoading = true;
      this.messagesLimit += 5; // Incrementa el límite de mensajes
      this.updateDisplayedMessages(); // Muestra más mensajes
    } catch (error) {
      this.errorMessage = 'Error al cargar más mensajes. Intenta nuevamente.';
    } finally {
      this.isLoading = false; // Restablece el estado de carga
    }
  }
}
