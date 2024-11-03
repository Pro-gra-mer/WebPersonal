export interface Article {
  id: number;
  title: string;
  content: string;
  publishDate: Date; // Fecha de publicación
  imageUrl: string;
  slug: string;
  metaDescription: string;
  keyword: string;
}
