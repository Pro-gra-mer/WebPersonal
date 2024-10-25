import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArticleComponent } from './upload-article.component';

describe('UploadArticleComponent', () => {
  let component: UploadArticleComponent;
  let fixture: ComponentFixture<UploadArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
