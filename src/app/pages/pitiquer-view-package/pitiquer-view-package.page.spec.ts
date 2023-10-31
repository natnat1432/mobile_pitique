import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PitiquerViewPackagePage } from './pitiquer-view-package.page';

describe('PitiquerViewPackagePage', () => {
  let component: PitiquerViewPackagePage;
  let fixture: ComponentFixture<PitiquerViewPackagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PitiquerViewPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
