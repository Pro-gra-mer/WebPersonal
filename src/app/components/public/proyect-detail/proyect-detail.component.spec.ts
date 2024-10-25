import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectDetailComponent } from './proyect-detail.component';

describe('ProyectDetailComponent', () => {
  let component: ProyectDetailComponent;
  let fixture: ComponentFixture<ProyectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
