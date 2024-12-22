import { Component } from '@angular/core';
import { UploadProjectComponent } from '../upload-project/upload-project.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [UploadProjectComponent],
})
export class AdminDashboardComponent {}
