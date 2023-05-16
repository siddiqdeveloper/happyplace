import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogImageComponent } from './blog-image.component';

describe('BlogImageComponent', () => {
  let component: BlogImageComponent;
  let fixture: ComponentFixture<BlogImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
