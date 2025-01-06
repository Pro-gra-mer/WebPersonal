import { Project } from './project.model';

export const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  description: 'This is a test description',
  content: '<p>Content</p>',
  publishDate: new Date('2023-12-31'), // Fecha como objeto Date
  imageUrl: 'http://example.com/image.jpg',
};
