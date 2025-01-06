import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para manejar servicios con HttpClient
import { RouterTestingModule } from '@angular/router/testing'; // Para manejar navegación en pruebas

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectsComponent, // Standalone component
        HttpClientTestingModule, // Proveer HttpClient para servicios
        RouterTestingModule, // Proveer Router para navegación
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
