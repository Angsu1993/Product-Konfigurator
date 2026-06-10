import { Component, input, output } from '@angular/core';
import { ColorOptionValue } from '../../models/product-option.model';

@Component({
  selector: 'app-color-selector',
  imports: [],
  templateUrl: './color-selector.html',
  styleUrl: './color-selector.scss',
})
export class ColorSelector {
  colors = input.required<ColorOptionValue[]>();
  selectedColorId = input<string | null>(null);

  colorSelected = output<ColorOptionValue>();

  selectColor(color: ColorOptionValue): void {
    this.colorSelected.emit(color);
  }
}
