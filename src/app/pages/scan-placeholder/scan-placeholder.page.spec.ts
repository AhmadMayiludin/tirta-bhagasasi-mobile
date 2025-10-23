import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanPlaceholderPage } from './scan-placeholder.page';

describe('ScanPlaceholderPage', () => {
  let component: ScanPlaceholderPage;
  let fixture: ComponentFixture<ScanPlaceholderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPlaceholderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
