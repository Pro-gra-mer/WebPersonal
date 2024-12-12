import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit, OnDestroy {
  readonly MAX_CONTENT_LENGTH = 500;
  messageForm: FormGroup = this.fb.group({
    content: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.MAX_CONTENT_LENGTH),
        Validators.pattern(/^(?!\s*$).+/),
      ],
    ],
  });

  isLoggedIn: boolean = false;
  username: string | null = null;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  charactersRemaining: number = this.MAX_CONTENT_LENGTH;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.setupFormSubscription();
  }

  private setupFormSubscription(): void {
    this.messageForm
      .get('content')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.updateCharactersRemaining(value));
  }

  ngOnInit(): void {
    combineLatest([this.authService.isLoggedIn$, this.authService.username$])
      .pipe(
        takeUntil(this.destroy$),
        map(([isLoggedIn, username]) => ({ isLoggedIn, username }))
      )
      .subscribe({
        next: ({ isLoggedIn, username }) => {
          this.isLoggedIn = isLoggedIn;
          this.username = username;
          if (!isLoggedIn) {
            console.log('User not logged in');
          }
        },
        error: (error) => this.handleError(error),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateCharactersRemaining(content: string): void {
    this.charactersRemaining = this.MAX_CONTENT_LENGTH - (content?.length || 0);
  }

  getErrorMessage(): string {
    const contentControl = this.messageForm.get('content');

    if (!contentControl?.errors) {
      return '';
    }

    if (contentControl.errors['required']) {
      return 'Message content is required';
    }

    if (contentControl.errors['maxlength']) {
      return `Message cannot exceed ${this.MAX_CONTENT_LENGTH} characters`;
    }

    if (contentControl.errors['pattern']) {
      return 'Message cannot be empty or contain only whitespace';
    }

    return 'Invalid message content';
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (!this.isLoggedIn) {
      console.log('User not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }

    if (this.messageForm.invalid) {
      this.errorMessage = this.getErrorMessage();
      return;
    }

    if (this.isSubmitting || !this.username) {
      this.handleError(new Error('Cannot create message: invalid state'));
      return;
    }

    this.isSubmitting = true;

    const newMessage: Message = {
      id: Date.now(),
      content: this.messageForm.get('content')?.value.trim(),
      date: new Date(),
      username: this.username,
      formattedDate: new Date().toLocaleString(),
    };

    this.messageService
      .sendMessage(newMessage)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: () => {
          this.resetForm();
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  private resetForm(): void {
    this.messageForm.reset();
    this.charactersRemaining = this.MAX_CONTENT_LENGTH;
    this.errorMessage = null;
  }

  private handleError(error: unknown): void {
    console.error('Detailed error:', error);
    this.errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
  }
}
