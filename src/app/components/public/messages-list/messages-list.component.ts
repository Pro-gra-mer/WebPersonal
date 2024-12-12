import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core'; // Importación de módulos necesarios para el componente y manejo de cambios.
import { CommonModule } from '@angular/common'; // Módulo común de Angular.
import { DateService } from '../../../services/date.service'; // Servicio personalizado para manejo de fechas.
import { Message } from '../../../models/message.model'; // Modelo de datos para mensajes.
import { MessageService } from '../../../services/message.service'; // Servicio de manejo de mensajes.
import { Subject } from 'rxjs'; // Clase Subject de RxJS para manejo de suscripciones.
import { takeUntil } from 'rxjs/operators'; // Operador para completar suscripciones automáticamente.

@Component({
  selector: 'app-messages-list', // Selector del componente.
  standalone: true, // Indica que este es un componente independiente.
  imports: [CommonModule], // Importación de módulos necesarios para este componente.
  providers: [DateService], // Proveedor del servicio de fecha.
  templateUrl: './messages-list.component.html', // Ruta de la plantilla HTML del componente.
  styleUrls: ['./messages-list.component.css'], // Ruta de los estilos CSS del componente.
})
export class MessagesListComponent implements OnInit, OnDestroy {
  messages: Message[] = []; // Arreglo para almacenar todos los mensajes.
  displayedMessages: Message[] = []; // Arreglo para almacenar los mensajes que se mostrarán.
  messagesLimit = 5; // Límite inicial de mensajes a mostrar.
  private destroy$ = new Subject<void>(); // Subject utilizado para completar suscripciones en ngOnDestroy.
  private isLoading = false; // Indicador de estado de carga.

  constructor(
    private dateService: DateService, // Servicio de fecha inyectado.
    private messageService: MessageService, // Servicio de mensajes inyectado.
    private cd: ChangeDetectorRef // ChangeDetectorRef inyectado para detectar cambios manualmente.
  ) {}

  ngOnInit(): void {
    // Suscripción al observable de mensajes del servicio MessageService.
    this.messageService.messages$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (messages) => {
        this.messages = messages.map((msg) => ({
          ...msg,
          formattedDate: this.dateService.transformDate(msg.date), // Formatear la fecha usando el servicio DateService.
        }));
        this.updateDisplayedMessages(); // Actualizar la lista de mensajes a mostrar.
        this.cd.detectChanges(); // Detectar cambios manualmente para actualizar la vista.
      },
      error: (error) => console.error('Error in messages subscription:', error), // Manejo de errores.
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emite un valor para completar las suscripciones.
    this.destroy$.complete(); // Completa el Subject para limpiar las suscripciones.
  }

  private updateDisplayedMessages(): void {
    // Actualiza la lista de mensajes a mostrar basado en el límite de mensajes.
    this.displayedMessages = this.messages.slice(0, this.messagesLimit);
  }

  loadMoreMessages(): void {
    // Si ya se está cargando, no hace nada.
    if (this.isLoading) return;

    try {
      this.isLoading = true; // Establece el estado de carga.
      this.messagesLimit += 5; // Incrementa el límite de mensajes a mostrar.
      this.updateDisplayedMessages(); // Actualiza la lista de mensajes a mostrar.
    } catch (error) {
      console.error('Error loading more messages:', error); // Manejo de errores.
    } finally {
      this.isLoading = false; // Restablece el estado de carga.
    }
  }
}
