import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { EditProjectComponent } from './components/admin/edit-project/edit-project.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'request-password', component: RequestPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/request-password', pathMatch: 'full' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  // Ruta protegida: Solo usuarios autenticados y administradores
  {
    path: 'projects/edit/:id',
    component: EditProjectComponent,
    canActivate: [authGuard, adminGuard], // Protegido por los guards
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminGuard],
  },
  // Redirección en caso de rutas no encontradas
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
