import { Product } from '../models/product.model';

export const PRODUCT_DATA: Product = {
  "id": "product|12345",
  "baseImageUrl": "assets/images/product|12345-1.png",
  "name": "Basic T-Shirt",
  "description": {
    "title": "Mach's zu deinem Lieblingsshirt!",
    "intro": "Farbenfroh, frei und ganz nach deinem Geschmack - dieses T-Shirt wartet nur darauf, von dir gestaltet zu werden! Such dir deine Wunschfarbe und Größe aus, lade dein eigenes Logo hoch und entscheide, wo's glänzen soll: dezent über dem Herzen, charmant auf der rechten Brust oder als echter Hingucker in A4-Größe mitten auf dem Torso. Ob für dein Herzensprojekt, dein Team oder einfach nur dich - hier wird aus Stoff Persönlichkeit. 🌈💫\n\nKlick dich kreativ - dein Unikat wartet!"
  },
  "pricing": {
    "price": "19.99",
    "currency": "EUR",
    "taxInPercent": "19"
  },
  "options": [
    {
      "id": "color",
      "label": "Farbe",
      "type": "color-palette",
      "required": true,
      "optionDetails": {
        "values": [
          {
            "id": "color|1",
            "value": "#ebe6e0",
            "relativeToBaseColor": null,
            "imageUrl": "/images/product|12345-1.png"
          },
          {
            "id": "color|2",
            "value": "#dbf0df",
            "relativeToBaseColor": { "hue": "100deg", "saturation": "200%" },
            "imageUrl": "/images/product|12345-2.png"
          },
          {
            "id": "color|3",
            "value": "#dbdff0",
            "relativeToBaseColor": { "hue": "200deg", "saturation": "200%" },
            "imageUrl": "/images/product|12345-3.png"
          }
        ]
      }
    },
    {
      "id": "size",
      "label": "Größe",
      "type": "dropdown",
      "required": true,
      "optionDetails": {
        "values": [
          {
            "id": "size|1",
            "value": "S"
          },
          {
            "id": "size|2",
            "value": "M"
          },
          {
            "id": "size|3",
            "value": "L"
          },
          {
            "id": "size|4",
            "value": "XL"
          }
        ]
      }
    },
    {
      "id": "logo-upload",
      "label": "Eigenes Logo",
      "type": "file-upload",
      "required": false,
      "optionDetails": {
        "values": [
          {
            "id": "logoUpload|1",
            "value": "Torso",
            "recommendedImageWidth": "2529px",
            "recommendedImageHeight": "3555px",
            "minImageWidth": "809px",
            "minImageHeight": "1138px"
          },
          {
            "id": "logoUpload|2",
            "value": "Brust links",
            "recommendedImageWidth": "1038px",
            "recommendedImageHeight": "696px",
            "minImageWidth": "333px",
            "minImageHeight": "223px"
          },
          {
            "id": "logoUpload|3",
            "value": "Brust rechts",
            "recommendedImageWidth": "1038px",
            "recommendedImageHeight": "696px",
            "minImageWidth": "333px",
            "minImageHeight": "223px"
          }

        ],
        "accept": "image/png, image/jpeg",
        "maxFileSize": "12MB"
      }
    }
  ],
  "conditionalOptionDetails": [
    {
      "targetOptionId": "size",
      "when": {
        "all": [
          { "sourceOptionId": "color", "value": "color|2" }
        ]
      },
      "disabledValueIds": ["size|2", "size|3"]
    }
  ]
}
