import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para servicios con HttpClient
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Para formularios reactivos

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Standalone component
        HttpClientTestingModule, // Proveer HttpClient para servicios
        ReactiveFormsModule, // Para formularios reactivos
        FormsModule, // Si se usan formularios template-driven
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
