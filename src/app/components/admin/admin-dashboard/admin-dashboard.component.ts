import { Component } from '@angular/core';
import { UploadProjectComponent } from '../upload-project/upload-project.component';
import { UploadArticleComponent } from '../upload-article/upload-article.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [UploadArticleComponent, UploadProjectComponent],
})
export class AdminDashboardComponent {}
