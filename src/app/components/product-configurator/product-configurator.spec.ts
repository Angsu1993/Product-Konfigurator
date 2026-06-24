import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigurator } from './product-configurator';

describe('ProductConfigurator', () => {
  let component: ProductConfigurator;
  let fixture: ComponentFixture<ProductConfigurator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductConfigurator],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductConfigurator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should replace previous color modifier when color changes', () => {
  component.priceModifiers.set({
    color: 1.99,
  });

  component.priceModifiers.update(current => ({
    ...current,
    color: 3.2,
  }));

  expect(component.priceModifiers()['color']).toBe(3.2);
});

it('should mark selected size as invalid when color disables it', () => {
  component.selectedColorId.set('color|2');
  component.selectedSizeId.set('size|2');

  expect(component.isSelectedSizeInvalid()).toBe(true);
});

it('should disable add to cart for invalid configuration', () => {
  component.selectedColorId.set('color|2');
  component.selectedSizeId.set('size|2');

  expect(component.canAddToCart()).toBe(false);
});

});
