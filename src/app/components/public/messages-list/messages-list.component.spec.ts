import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesListComponent } from './messages-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa para manejar servicios que usen HttpClient

describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MessagesListComponent, // Se importa como standalone
        HttpClientTestingModule, // Proveer HttpClient si el componente usa servicios HTTP
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
