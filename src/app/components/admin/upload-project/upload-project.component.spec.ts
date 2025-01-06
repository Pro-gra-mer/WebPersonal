import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadProjectComponent } from './upload-project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuillModule } from 'ngx-quill';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { of, throwError } from 'rxjs';
import { mockProject } from '../../../models/project.mock';

describe('UploadProjectComponent', () => {
  let component: UploadProjectComponent;
  let fixture: ComponentFixture<UploadProjectComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const projectSpy = jasmine.createSpyObj('ProjectService', [
      'createProject',
    ]);
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    await TestBed.configureTestingModule({
      imports: [
        UploadProjectComponent,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        QuillModule.forRoot(),
      ],
      providers: [
        { provide: ProjectService, useValue: projectSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadProjectComponent);
    component = fixture.componentInstance;
    projectServiceSpy = TestBed.inject(
      ProjectService
    ) as jasmine.SpyObj<ProjectService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#title')).toBeTruthy();
    expect(compiled.querySelector('#description')).toBeTruthy();
    expect(compiled.querySelector('quill-editor')).toBeTruthy();
    expect(compiled.querySelector('#publishDate')).toBeTruthy();
    expect(compiled.querySelector('#imageUrl')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('should validate form fields', () => {
    component.projectForm.setValue({
      title: '',
      description: '',
      content: '',
      publishDate: '',
      imageUrl: '',
    });

    expect(component.projectForm.invalid).toBeTrue();

    component.projectForm.setValue({
      title: 'Test Project',
      description: 'This is a test description',
      content: '<p>Content</p>',
      publishDate: '2023-12-31',
      imageUrl: 'http://example.com/image.jpg',
    });

    expect(component.projectForm.valid).toBeTrue();
  });

  it('should call ProjectService.createProject on form submission', () => {
    projectServiceSpy.createProject.and.returnValue(of(mockProject));

    component.projectForm.setValue({
      title: 'Test Project',
      description: 'This is a test description',
      content: '<p>Content</p>',
      publishDate: '2023-12-31',
      imageUrl: 'http://example.com/image.jpg',
    });

    component.onSubmit();
    expect(projectServiceSpy.createProject).toHaveBeenCalledWith(
      component.projectForm.value
    );
    expect(component.message).toBe('Proyecto subido exitosamente.');
  });

  it('should handle error on form submission', () => {
    projectServiceSpy.createProject.and.returnValue(
      throwError(() => new Error('Error al subir el proyecto'))
    );
    component.projectForm.setValue({
      title: 'Test Project',
      description: 'This is a test description',
      content: '<p>Content</p>',
      publishDate: '2023-12-31',
      imageUrl: 'http://example.com/image.jpg',
    });

    component.onSubmit();
    expect(component.message).toBe(
      'Error al subir el proyecto: Error al subir el proyecto'
    );
  });

  it('should handle image upload', () => {
    const fakeToken = 'fake-token';
    const mockResponse = { imageUrl: '/uploads/test-image.jpg' };
    authServiceSpy.getToken.and.returnValue(fakeToken);

    spyOn(document, 'createElement').and.callFake(() => {
      const input = document.createElement('input');
      input.type = 'file';
      return input;
    });

    component.handleImageUpload();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(fileInput).toBeTruthy();
  });
});
