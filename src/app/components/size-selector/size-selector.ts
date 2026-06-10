import { Component, computed, input, output } from '@angular/core';
import { SizeOptionValue } from '../../models/product-option.model';

@Component({
  selector: 'app-size-selector',
  imports: [],
  templateUrl: './size-selector.html',
  styleUrl: './size-selector.scss',
})
export class SizeSelector {
  sizes = input.required<SizeOptionValue[]>();
  selectedSizeId = input<string | null>(null);
  disabledSizeIds = input<string[]>([]);

  sizeSelected = output<SizeOptionValue>();

  // converts the disabled size ID to set fro has founction
  disabledSizeCheck = computed(
    () => new Set(this.disabledSizeIds())
  );

  selectSize(size: SizeOptionValue): void {
    if (this.disabledSizeIds().includes(size.id)) return;
    this.sizeSelected.emit(size);
  }
}
