import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProyectComponent } from './upload-proyect.component';

describe('UploadProyectComponent', () => {
  let component: UploadProyectComponent;
  let fixture: ComponentFixture<UploadProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadProyectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
