import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para manejar servicios con HttpClient
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Para formularios reactivos

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordComponent, // Standalone component
        HttpClientTestingModule, // Proveer HttpClient para servicios
        ReactiveFormsModule, // Para formularios reactivos
        FormsModule, // Para formularios template-driven
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
