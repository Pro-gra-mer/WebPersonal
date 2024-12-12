import { Injectable } from '@angular/core'; // Decorador para indicar que el servicio puede ser inyectado en otros componentes o servicios.
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Cliente HTTP y cabeceras HTTP para realizar solicitudes a la API.
import { BehaviorSubject, lastValueFrom } from 'rxjs'; // BehaviorSubject para gestionar el estado de los mensajes y lastValueFrom para convertir un Observable en una Promesa.
import { Message } from '../models/message.model'; // Modelo de datos para los mensajes.
import { AuthService } from './auth.service'; // Servicio de autenticación para obtener el token de usuario.
import { Router } from '@angular/router'; // Router para la navegación programática.

@Injectable({
  providedIn: 'root', // Indica que este servicio está disponible en la raíz de la aplicación, usando el inyector de dependencias.
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/api/messages'; // URL de la API de mensajes.
  private messagesSubject = new BehaviorSubject<Message[]>([]); // BehaviorSubject para manejar el estado de los mensajes.
  public messages$ = this.messagesSubject.asObservable(); // Observable público para que otros componentes se suscriban a los cambios en los mensajes.

  constructor(
    private http: HttpClient, // Cliente HTTP inyectado.
    private authService: AuthService, // Servicio de autenticación inyectado.
    private router: Router // Router inyectado para la navegación.
  ) {
    this.initializeMessages(); // Inicializar los mensajes cuando el servicio se crea.
  }

  // Método para obtener las cabeceras de autenticación.
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación.
    if (!token) {
      this.router.navigate(['/']); // Si no hay token, redirigir al usuario a la página principal.
      return new HttpHeaders(); // Retornar cabeceras vacías.
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`); // Retornar cabeceras con el token de autenticación.
  }

  // Método asincrónico para inicializar los mensajes.
  private async initializeMessages(): Promise<void> {
    try {
      await this.loadMessages(); // Cargar los mensajes.
    } catch (error) {
      console.error('Failed to initialize messages:', error); // Log de error si falla la inicialización.
    }
  }

  // Método asincrónico para cargar los mensajes desde la API.
  private async loadMessages(): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.http.get<Message[]>(this.apiUrl, {
          headers: this.getAuthHeaders(),
        })
      ); // Obtener los mensajes desde la API y convertir el Observable en una Promesa.

      if (!response) throw new Error('No messages received'); // Si no se reciben mensajes, lanzar un error.

      const formattedMessages = this.formatAndSortMessages(response); // Formatear y ordenar los mensajes recibidos.
      this.messagesSubject.next(formattedMessages); // Actualizar el estado de los mensajes en el BehaviorSubject.
    } catch (error) {
      console.error('Error loading messages:', error); // Log de error si falla la carga de mensajes.
      throw error; // Rethrow del error para manejarlo en el método que llama.
    }
  }

  // Método para formatear y ordenar los mensajes por fecha.
  private formatAndSortMessages(messages: Message[]): Message[] {
    return messages
      .map((message) => ({
        ...message,
        date: new Date(message.date), // Convertir la fecha a un objeto Date.
        formattedDate: new Date(message.date).toLocaleString(), // Formatear la fecha a una cadena legible.
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Ordenar los mensajes por fecha descendente.
  }

  // Método asincrónico para enviar un mensaje.
  async sendMessage(message: Message): Promise<Message> {
    try {
      const newMessage = await lastValueFrom(
        this.http.post<Message>(this.apiUrl, message, {
          headers: this.getAuthHeaders(),
        })
      ); // Enviar el mensaje a la API y convertir el Observable en una Promesa.

      if (!newMessage) throw new Error('Failed to send message'); // Si no se recibe una respuesta, lanzar un error.

      const formattedNewMessage = {
        ...newMessage,
        date: new Date(newMessage.date), // Convertir la fecha del nuevo mensaje a un objeto Date.
        formattedDate: new Date(newMessage.date).toLocaleString(), // Formatear la fecha del nuevo mensaje.
      };

      const currentMessages = this.messagesSubject.value; // Obtener los mensajes actuales del BehaviorSubject.
      const updatedMessages = this.formatAndSortMessages([
        ...currentMessages,
        formattedNewMessage,
      ]); // Agregar el nuevo mensaje a los mensajes actuales y formatear y ordenar.

      this.messagesSubject.next(updatedMessages); // Actualizar el estado de los mensajes en el BehaviorSubject.
      return formattedNewMessage; // Retornar el nuevo mensaje formateado.
    } catch (error) {
      console.error('Error sending message:', error); // Log de error si falla el envío del mensaje.
      throw error; // Rethrow del error para manejarlo en el método que llama.
    }
  }

  // Método para refrescar los mensajes cargándolos nuevamente desde la API.
  async refreshMessages(): Promise<void> {
    await this.loadMessages(); // Cargar los mensajes nuevamente.
  }
}
