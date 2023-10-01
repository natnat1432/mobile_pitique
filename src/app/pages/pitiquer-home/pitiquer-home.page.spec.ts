import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PitiquerHomePage } from './pitiquer-home.page';

describe('PitiquerHomePage', () => {
  let component: PitiquerHomePage;
  let fixture: ComponentFixture<PitiquerHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PitiquerHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
