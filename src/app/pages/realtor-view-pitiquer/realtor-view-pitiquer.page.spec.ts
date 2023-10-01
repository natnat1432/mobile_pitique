import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealtorViewPitiquerPage } from './realtor-view-pitiquer.page';

describe('RealtorViewPitiquerPage', () => {
  let component: RealtorViewPitiquerPage;
  let fixture: ComponentFixture<RealtorViewPitiquerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RealtorViewPitiquerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
