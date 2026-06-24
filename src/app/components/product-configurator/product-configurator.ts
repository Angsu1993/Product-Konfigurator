import { Component, input, computed, signal, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { ColorOptionValue, SizeOptionValue, UploadedLogo } from '../../models/product-option.model';
import { ColorSelector } from '../color-selector/color-selector';
import { SizeSelector } from '../size-selector/size-selector';
import { LogoUpload } from '../logo-upload/logo-upload';
import { Pricing } from '../../services/pricing';
import { LogoPlacementOptionValue } from '../../models/product.model';

@Component({
  selector: 'app-product-configurator',
  imports: [ColorSelector, SizeSelector, LogoUpload],
  templateUrl: './product-configurator.html',
  styleUrl: './product-configurator.scss',
})
export class ProductConfigurator {
  private readonly pricingService = inject(Pricing);
  product = input.required<Product>();
  flashColor = signal<string | null>(null);

  //--------color selector---------

  // getting color selector info from product data
  colorOption = computed(() => this.product().options.find((option) => option.id === 'color'));
  colorValues = computed(() => this.colorOption()?.optionDetails.values as ColorOptionValue[]);
  selectedColorId = signal<string | null>(null);

  //by default first color is slected
  activeColorId = computed(() =>
    this.selectedColorId() ?? this.colorValues()[0]?.id ?? null
  );

  selectedColor = computed(() =>
    this.colorValues().find(
      color => color.id === this.activeColorId()) ?? null
  );
  //on color select - setting color
  onColorSelected(color: ColorOptionValue): void {
    this.selectedColorId.set(color.id);
    this.loadPriceModifier('color', color.id);
    this.triggerColorFlash(color.value);
  }

  selectedColorFilter = computed(() => {
    const relativeColor = this.selectedColor()?.relativeToBaseColor;
    if (!relativeColor) return 'none';
    return `hue-rotate(${relativeColor.hue}) saturate(${relativeColor.saturation})`;
  })

  //--------size selector---------
  // getting size selector info from product data
  sizeOption = computed(() => this.product().options.find((option) => option.id === 'size'));
  sizeValues = computed(() => this.sizeOption()?.optionDetails.values as SizeOptionValue[]);
  selectedSizeId = signal<string | null>(null);

  //by default first size is slected
  activeSizeId = computed(() =>
    this.selectedSizeId() ?? this.sizeValues()[0]?.id ?? null
  );
  selectedSize = computed(() =>
    this.sizeValues().find(
      size => size.id === this.activeSizeId()
    ) ?? null
  );

  onSizeSelected(size: SizeOptionValue): void {
    this.selectedSizeId.set(size.id)
    this.loadPriceModifier('size', size.id);
  }

  //checking size availablity depending on size
  disabledSizeIds = computed(() => {
    const selectedColorId = this.activeColorId();
    const rule = this.product().conditionalOptionDetails.find((rule) =>
      rule.when.all.some(
        (condition) =>
          condition.sourceOptionId === 'color' &&
          condition.value === selectedColorId
      )
    );

    return rule?.disabledValueIds ?? [];
  });

  isSelectedSizeInvalid = computed(() => {
    if (!this.activeSizeId()) {
      return false;
    }
    return this.disabledSizeIds().includes(this.activeSizeId());
  });

  //disabling add cart button
  canAddToCart = computed(() => {
    return Boolean(this.selectedColorId()) &&
      Boolean(this.selectedSizeId()) &&
      !this.isSelectedSizeInvalid();
  });

  //--------------Logo upload--------------

  // checking for logo options criterias
  logoUploadOption = computed(() =>
    this.product().options.find(
      option => option.id === 'logo-upload'
    )
  );
  uploadedLogoUrl = signal<string | null>(null);


  onLogoSelected(logo: UploadedLogo): void {
    this.uploadedLogoUrl.set(logo.previewUrl);

    const defaultPlacement = this.logoPlacementValues().find((placement) => placement.id === 'logoUpload|1');

    if (!defaultPlacement) return;
    this.selectedLogoPlacementId.set(defaultPlacement.id);
    this.loadPriceModifier('logo-upload', defaultPlacement.id);
  }
  //--------------Pricing--------------

  priceModifiers = signal<Record<string, number>>({});

  //base price from data
  basePrice = computed(() => Number(this.product().pricing.price));

  //calculating total price
  totalPrice = computed(() => {
    const modifiers = Object.values(this.priceModifiers());
    return modifiers.reduce(
      (total, modifier) => total + modifier, this.basePrice());

  })

  //API call to service to upadte the pricing 
  private loadPriceModifier(optionId: string, optionValueId: string): void {
    this.pricingService
      .getOptionPriceModifier(this.product().id, optionValueId)
      .subscribe((modifier) => {
        //console.log('API RESPONSE', modifier); //for testing API 
        this.priceModifiers.update((current) => ({
          ...current,
          [optionId]: modifier.fixedAmount ?? 0,
        }));
      });
  }

  formattedTotalPrice = computed(() =>
    `${this.totalPrice().toFixed(2).replace('.', ',')} €`
  );


  //------------Logo placement try----------
  logoPlacementValues = computed(() => this.logoUploadOption()?.optionDetails.values as LogoPlacementOptionValue[]);
  selectedLogoPlacementId = signal<string | null>(null);


  activeLogoPlacementId = computed(() =>
    this.selectedLogoPlacementId() ?? this.logoPlacementValues()[0]?.id ?? null
  );

  selectedLogoPlacement = computed(() =>
    this.logoPlacementValues().find(placement => placement.id === this.activeLogoPlacementId()) ?? null);

  // style changes for logo placement
  logoPlacementClass = computed(() => {
    switch (this.selectedLogoPlacement()?.id) {
      case 'logoUpload|2':
        return 'uploaded-logo--left-chest';

      case 'logoUpload|3':
        return 'uploaded-logo--right-chest';

      case 'logoUpload|1':
      default:
        return 'uploaded-logo--torso';
    }
  });

  onLogoPlacementSelected(placement: LogoPlacementOptionValue): void {
    this.selectedLogoPlacementId.set(placement.id);
    this.loadPriceModifier('logo-upload', placement.id);
  }

  private triggerColorFlash(color: string): void {
    this.flashColor.set(color);
    setTimeout(() => {
      this.flashColor.set(null);
    }, 600)
  }

  removeLogo(): void {
    this.uploadedLogoUrl.set(null);
    this.selectedLogoPlacementId.set(null);

    this.priceModifiers.update((current) => {
      const { ['logo-upload']: _removed, ...rest } = current;
      return rest;
    });
  }
}
