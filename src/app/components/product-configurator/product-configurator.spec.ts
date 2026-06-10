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
});
