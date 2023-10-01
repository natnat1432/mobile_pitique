import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PitiquerViewPackagesPage } from './pitiquer-view-packages.page';

describe('PitiquerViewPackagesPage', () => {
  let component: PitiquerViewPackagesPage;
  let fixture: ComponentFixture<PitiquerViewPackagesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PitiquerViewPackagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
