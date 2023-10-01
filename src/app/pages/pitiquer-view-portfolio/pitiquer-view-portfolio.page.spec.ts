import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PitiquerViewPortfolioPage } from './pitiquer-view-portfolio.page';

describe('PitiquerViewPortfolioPage', () => {
  let component: PitiquerViewPortfolioPage;
  let fixture: ComponentFixture<PitiquerViewPortfolioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PitiquerViewPortfolioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
