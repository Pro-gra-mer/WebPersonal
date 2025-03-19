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

// Se exporta la constante 'routes' con la definición de todas las rutas de la aplicación.
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'request-password', component: RequestPasswordComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  // Ruta para editar proyectos, protegida por guards de autenticación y administración.
  {
    path: 'projects/edit/:id',
    component: EditProjectComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminGuard],
  },
  // Ruta comodín que redirige a la ruta principal si la URL no coincide con ninguna ruta definida.
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
