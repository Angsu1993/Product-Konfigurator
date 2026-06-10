import { Component } from '@angular/core';
import { ProductConfigurator } from './components/product-configurator/product-configurator';

@Component({
  selector: 'app-root',
  imports: [ProductConfigurator],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}