// src/app/models/article.model.ts
export interface Section {
  heading?: string; // h2, h3, etc.
  paragraph: string;
}

export interface Article {
  id: number;
  title: string;
  content: Section[]; // Arreglo de secciones
  publishDate: Date;
  imageUrl: string;
  slug: string;
  metaDescription: string;
  keyword: string;
}
