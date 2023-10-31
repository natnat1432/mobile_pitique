import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RealtorBookPitiquerLocationPage } from './realtor-book-pitiquer-location.page';

describe('RealtorBookPitiquerLocationPage', () => {
  let component: RealtorBookPitiquerLocationPage;
  let fixture: ComponentFixture<RealtorBookPitiquerLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RealtorBookPitiquerLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
