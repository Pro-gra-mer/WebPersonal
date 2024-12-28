import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CKEditorService {
  public Editor: any;

  constructor() {
    if (typeof window !== 'undefined') {
      // Asegúrate de que el código solo se ejecute en el navegador
      this.Editor = require('@ckeditor/ckeditor5-build-classic');
    }
  }
}
