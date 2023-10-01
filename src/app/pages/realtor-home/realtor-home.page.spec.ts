import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealtorHomePage } from './realtor-home.page';

describe('RealtorHomePage', () => {
  let component: RealtorHomePage;
  let fixture: ComponentFixture<RealtorHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RealtorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
