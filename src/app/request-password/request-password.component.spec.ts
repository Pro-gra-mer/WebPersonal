import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestPasswordComponent } from './request-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para manejar servicios con HttpClient
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Para formularios reactivos

describe('RequestPasswordComponent', () => {
  let component: RequestPasswordComponent;
  let fixture: ComponentFixture<RequestPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RequestPasswordComponent, // Standalone component
        HttpClientTestingModule, // Proveer HttpClient para servicios
        ReactiveFormsModule, // Para formularios reactivos
        FormsModule, // Para formularios template-driven
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
