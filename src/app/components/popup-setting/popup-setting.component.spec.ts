import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PopupSettingComponent } from "./popup-setting.component";

describe("PopupSettingComponent", () => {
  let component: PopupSettingComponent;
  let fixture: ComponentFixture<PopupSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupSettingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
