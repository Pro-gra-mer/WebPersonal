import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para manejar servicios con HttpClient
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Para formularios reactivos

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent, // Standalone component
        HttpClientTestingModule, // Proveer HttpClient para servicios
        ReactiveFormsModule, // Para formularios reactivos
        FormsModule, // Para formularios template-driven
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
