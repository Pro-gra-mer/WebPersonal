// src/app/models/article.model.ts
export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  publishDate: Date; // Puedes usar Date si deseas
  imageUrl: string;
  link: string;
}
