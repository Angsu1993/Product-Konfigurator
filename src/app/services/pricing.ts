import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductOptionPriceModifier } from '../models/pricing.model';

@Injectable({
  providedIn: 'root',
})
export class Pricing {
  private readonly mockModifiers: Record<string, number | null> = {
    'color|1': null,
    'color|2': 1.99,
    'color|3': 3.2,
    'size|1': null,
    'size|2': null,
    'size|3': 1.99,
    'size|4': 3.2,
    'logoUpload|1': 4.4,
    'logoUpload|2': 3.2,
    'logoUpload|3': 3.2,
  };

  getOptionPriceModifier(
    productId: string,
    optionValueId: string
  ): Observable<ProductOptionPriceModifier> {

    return of({
      productId,
      optionValueId,
      fixedAmount: this.mockModifiers[optionValueId] ?? null
    });
  }
}