import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { mockMessage } from '../../../models/message.mock';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn$',
      'username$',
    ]);
    const messageSpy = jasmine.createSpyObj('MessageService', ['sendMessage']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        MessageComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    authServiceSpy.isLoggedIn$ = of(true);
    authServiceSpy.username$ = of('testUser');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login if user is not logged in', () => {
    authServiceSpy.isLoggedIn$ = of(false);
    fixture.detectChanges();

    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call sendMessage and reset form on successful submit', () => {
    messageServiceSpy.sendMessage.and.returnValue(of(mockMessage));

    component.messageForm.get('content')?.setValue(mockMessage.content);
    component.onSubmit();

    expect(messageServiceSpy.sendMessage).toHaveBeenCalledWith(
      jasmine.objectContaining({
        content: mockMessage.content,
        username: mockMessage.username,
      })
    );
    expect(component.messageForm.valid).toBeFalse(); // Form should be reset
    expect(component.charactersRemaining).toBe(component.MAX_CONTENT_LENGTH);
  });

  it('should handle error on submit', () => {
    messageServiceSpy.sendMessage.and.returnValue(
      throwError(() => new Error('Error sending message'))
    );

    component.messageForm.get('content')?.setValue(mockMessage.content);
    component.onSubmit();

    expect(component.errorMessage).toBe('Error sending message');
  });
});
