import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ArticlesListComponent } from './pages/articles-list/articles-list.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: 'projects', component: ProjectsListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
