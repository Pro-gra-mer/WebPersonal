// date.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  // Método para transformar la fecha usando Intl.DateTimeFormat
  transformDate(
    date: Date | string,
    locale: string = 'es-ES',
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
  ): string {
    const parsedDate = new Date(date);
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(parsedDate);
  }
}
