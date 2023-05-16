import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBannerImageComponent } from './bottom-banner-image.component';

describe('BottomBannerImageComponent', () => {
  let component: BottomBannerImageComponent;
  let fixture: ComponentFixture<BottomBannerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBannerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBannerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
