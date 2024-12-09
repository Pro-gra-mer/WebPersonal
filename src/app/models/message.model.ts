export interface Message {
  id: number;
  content: string;
  date: Date;
  username: string;
  formattedDate?: string;
}
