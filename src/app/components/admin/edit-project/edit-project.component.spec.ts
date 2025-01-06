import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuillModule } from 'ngx-quill';
import { EditProjectComponent } from './edit-project.component';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { of, throwError } from 'rxjs';
import { mockProject } from '../../../models/project.mock';

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const projectSpy = jasmine.createSpyObj('ProjectService', [
      'getProject',
      'updateProject',
    ]);
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        QuillModule.forRoot(),
      ],
      declarations: [EditProjectComponent],
      providers: [
        { provide: ProjectService, useValue: projectSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProjectComponent);
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

  it('should load project data on init', () => {
    component.projectId = 1; // Asegurar que no es null
    projectServiceSpy.getProject.and.returnValue(of(mockProject));

    component.ngOnInit();
    fixture.detectChanges();

    expect(projectServiceSpy.getProject).toHaveBeenCalledWith(
      component.projectId!
    );
    expect(component.editForm.value).toEqual({
      title: mockProject.title,
      description: mockProject.description,
      content: mockProject.content,
      publishDate: mockProject.publishDate.toISOString().split('T')[0], // Formato de fecha en el formulario
      imageUrl: mockProject.imageUrl,
    });
  });

  it('should show error message if project fails to load', () => {
    projectServiceSpy.getProject.and.returnValue(
      throwError(() => new Error('Error'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.message).toBe('Error al cargar los datos del proyecto.');
  });

  it('should update project successfully', () => {
    projectServiceSpy.updateProject.and.returnValue(of(mockProject));
    component.projectId = 1;

    component.editForm.setValue({
      title: 'Updated Title',
      description: 'Updated Description',
      content: '<p>Updated Content</p>',
      publishDate: '2023-12-31',
      imageUrl: 'http://example.com/updated-image.jpg',
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(projectServiceSpy.updateProject).toHaveBeenCalledWith(
      1,
      jasmine.objectContaining({
        title: 'Updated Title',
        description: 'Updated Description',
      })
    );
    expect(component.message).toBe('Proyecto actualizado exitosamente.');
  });

  it('should handle update project error', () => {
    projectServiceSpy.updateProject.and.returnValue(
      throwError(() => new Error('Error'))
    );
    component.projectId = 1;

    component.editForm.setValue({
      title: 'Updated Title',
      description: 'Updated Description',
      content: '<p>Updated Content</p>',
      publishDate: '2023-12-31',
      imageUrl: 'http://example.com/updated-image.jpg',
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(component.message).toBe('Error al actualizar el proyecto.');
  });

  it('should handle cancel action', () => {
    const routerSpy = spyOn(component.router, 'navigate');

    component.onCancel();

    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });
});
