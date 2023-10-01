import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PitiquerAddPackagePage } from './pitiquer-add-package.page';

describe('PitiquerAddPackagePage', () => {
  let component: PitiquerAddPackagePage;
  let fixture: ComponentFixture<PitiquerAddPackagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PitiquerAddPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
