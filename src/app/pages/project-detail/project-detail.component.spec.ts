import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para servicios con HttpClient
import { ActivatedRoute } from '@angular/router'; // Para rutas activas
import { of } from 'rxjs'; // Para mockear datos observables

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectDetailComponent, // Standalone component
        HttpClientTestingModule, // Proveer HttpClient para servicios
      ],
      providers: [
        {
          provide: ActivatedRoute, // Mock de ActivatedRoute para pruebas
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1', // Mockear el parámetro de ID del proyecto
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
