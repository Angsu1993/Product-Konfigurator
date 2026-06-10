export interface Product {
  id: string;
  baseImageUrl: string;
  name: string;
  description: ProductDescription;
  pricing: ProductPricing;
  options: ProductOption[];
  conditionalOptionDetails: ConditionalOptionDetail[];
}

export interface ProductDescription {
  title: string;
  intro: string;
}

export interface ProductPricing {
  price: string;
  currency: string;
  taxInPercent: string;
}

export interface ProductOption {
  id: string;
  label: string;
  type: 'color-palette' | 'dropdown' | 'file-upload';
  required: boolean;
  optionDetails: OptionDetails;
}

export interface OptionDetails {
  values: OptionValue[];
  accept?: string;
  maxFileSize?: string;
}

export type OptionValue =
  | ColorOptionValue
  | SizeOptionValue
  | LogoPlacementOptionValue;

export interface ColorOptionValue {
  id: string;
  value: string;
  imageUrl?: string;
  relativeToBaseColor: {
    hue: string;
    saturation: string;
  } | null;
}

export interface SizeOptionValue {
  id: string;
  value: string;
}

export interface LogoPlacementOptionValue {
  id: string;
  value: string;
  recommendedImageWidth: string;
  recommendedImageHeight: string;
  minImageWidth: string;
  minImageHeight: string;
}

export interface ConditionalOptionDetail {
  targetOptionId: string;
  when: {
    all: Condition[];
  };
  disabledValueIds: string[];
}

export interface Condition {
  sourceOptionId: string;
  value: string;
}