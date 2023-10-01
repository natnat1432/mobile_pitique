import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationAccountPage } from './registration-account.page';

describe('RegistrationAccountPage', () => {
  let component: RegistrationAccountPage;
  let fixture: ComponentFixture<RegistrationAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrationAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
