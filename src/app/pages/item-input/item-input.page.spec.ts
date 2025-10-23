import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemInputPage } from './item-input.page';

describe('ItemInputPage', () => {
  let component: ItemInputPage;
  let fixture: ComponentFixture<ItemInputPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
