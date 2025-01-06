import { Message } from './message.model';

export const mockMessage: Message = {
  id: 1,
  content: 'This is a test message',
  date: new Date('2025-01-05T10:00:00Z'),
  username: 'testUser',
  formattedDate: '5/1/2025, 10:00:00',
};
