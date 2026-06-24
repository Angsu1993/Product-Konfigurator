import { Component , signal } from '@angular/core';
import { ProductConfigurator } from './components/product-configurator/product-configurator';
import { PRODUCT_DATA } from './data/product';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [ProductConfigurator],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  product = signal<Product>(PRODUCT_DATA);
}