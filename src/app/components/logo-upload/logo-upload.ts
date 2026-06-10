import { Component, computed, input, output } from '@angular/core';
import { UploadedLogo } from '../../models/product-option.model';

@Component({
  selector: 'app-logo-upload',
  imports: [],
  templateUrl: './logo-upload.html',
  styleUrl: './logo-upload.scss',
})
export class LogoUpload {
  accept = input.required<string>();
  maxFileSize = input.required<string>();

  logoSelected = output<UploadedLogo>();

  validationError = '';

  onFileSelected(event: Event): void {
    this.validationError = '';

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!this.accept().split(',').map(type => type.trim()).includes(file.type)) {
      this.validationError = 'Please upload a PNG or JPEG image.';
      return;
    }

    if (file.size > this.maxBytes()) {
      this.validationError =
        `File size must be below ${this.maxFileSize()}.`;

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.logoSelected.emit({
        file,
        previewUrl: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  }

  //need a number to check size constraint
  maxBytes = computed(() => {
    const maxSizeInMb = Number(
      this.maxFileSize().replace('MB', '')
    );

    return maxSizeInMb * 1024 * 1024;
  });
}
