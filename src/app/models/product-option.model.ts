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
export interface UploadedLogo {
  file: File;
  previewUrl: string;
}
