# Eddyson Merch Product Configurator

Interactive product configurator built with Angular.
The app allows users to configure a T-shirt by selecting color, size, logo upload and logo placement, with live preview, validation and mocked price updates.

## Run Locally

```bash
npm install
npm start
```

Open:

```text
http://localhost:4200
```

Build:

```bash
npm run build
```

## Implemented Features

* Product preview with base image
* Color selection using product-defined colors
* CSS filter-based color preview using `relativeToBaseColor`
* Size selection
* Conditional size availability based on selected color
* Invalid selection warning
* Add to Cart disabled for invalid configuration
* Logo upload with file type and file size validation
* Logo placement: Torso, Left Chest, Right Chest
* Mocked pricing API service
* Dynamic total price calculation
* Responsive layout

## Assumptions

The provided product data is treated as the main source for available options.

Only predefined color, size and logo placement values are rendered. A free color picker was intentionally not implemented because pricing and availability rules depend on known backend option value IDs.

The pricing endpoint is not available, so price modifiers are mocked in `PricingService`.

The Add to Cart button is present but non-functional as required by the task.

## Design Decisions

The configurator is split into small components:

* `ProductConfigurator`
* `ColorSelector`
* `SizeSelector`
* `LogoUpload`

The parent component consits the product state, selected option IDs, validation and pricing. Child components are mostly presentational and emit user selections.

Angular Signals were used for local UI state because the state is limited to this feature and does not require a global state management library. 
`computed()` is used for derived values such as selected color, disabled size IDs, invalid state and total price.

NgRx was considered unnecessary for this scope because it would add boilerplate without clear benefit.

## Conflict Resolution for Dependent Options

A user can select a size that later becomes unavailable after changing the color.

Example:

1. User selects size `L`
2. User changes color to green
3. Green disables sizes `M` and `L`

The selected size is preserved but marked as invalid. A validation message is shown and Add to Cart is disabled.

I chose this approach instead of automatically resetting the size because it avoids surprising the user and clearly explains what happened. 

Alternatives considered:

* Automatically reset the invalid size
  This keeps the configuration always valid, but may confuse users because their selection disappears.

* Keep the value and only block Add to Cart
  This is transparent and preserves user intent, so this approach was chosen.

* Show a confirmation dialog
  This would interrupt the flow and felt too heavy for this simple configurator.

## Preventing Invalid Cart Submission

The Add to Cart button is disabled when:

* required options are missing
* selected size is unavailable for the selected color

The final validation is represented by `canAddToCart`.

## Pricing Strategy

The task describes this endpoint:

```text
GET /api/v1/products/{productId}/options/{optionValueId}/pricing
```

Because no real API is available, the app uses a mocked `PricingService`.

The service returns deterministic price modifiers for selected option value IDs. The total price is calculated as:

```text
base price + selected option modifiers
```

Price modifiers are stored by option group, for example:

```ts
{
  color: 1.99,
  size: 3.2,
  "logo-upload": 4.4
}
```

This prevents old prices from accumulating when a user changes from one color or size to another.

## Logo Upload and Placement

The logo upload validates:

* accepted file types: PNG/JPEG
* maximum file size from product data

After upload, the logo is shown in the product preview. Torso is selected as the default placement. Users can switch between Torso, Left Chest and Right Chest.

Image dimension validation was considered but not fully implemented due to time scope. A production version should validate the uploaded image dimensions against the minimum and recommended dimensions from the product data.

## Product Color Preview

The product data contains `relativeToBaseColor`, so the preview uses a single base image and applies CSS filters such as `hue-rotate()` and `saturate()` for color variants.

This avoids needing separate product images for every color.

Trade-off: CSS filters may not perfectly match designer-approved product photography. For production, separate optimized product images may produce more accurate results.

## UX Consequences of Preserving Invalid Selections

When a previously valid option becomes invalid, the configurator keeps the user's original selection visible and marks it as invalid.

This has the benefit that the user understands what changed and does not lose their previous choice unexpectedly. If the user actually wanted to keep the originally selected size, the UI makes it clear that this is currently not possible with the newly selected color.

The downside is that the configurator can temporarily be in an invalid state. To reduce confusion, an error message is shown directly below the size selector.

## Preventing Invalid Cart Submission

Invalid configurations are prevented through the `canAddToCart` computed state.

The Add to Cart button is disabled when:

- a required option is missing
- the selected size is unavailable for the selected color

This ensures that the user cannot proceed with an invalid configuration from the frontend.

Final price and configuration validation would still need to happen in the backend during checkout.

## Modern Angular Features Used

* Standalone components
* Angular Signals
* `computed()`
* Signal-based `input()` and `output()`
* New Angular control flow with `@if` and `@for`

## CSS and UI Decisions

The UI uses CSS custom properties for design tokens:

* colors
* spacing
* border radius
* typography

CSS Grid is used for the main two-column layout, and Flexbox is used for option groups and controls.

The layout follows an 8px spacing rhythm and uses a light design with white background, subtle borders and clear visual states.

## Test Strategy

Implemented or planned tests:

* pricing service returns expected modifiers
* price calculation replaces old modifiers instead of accumulating them
* disabled size logic works for conditional rules
* Add to Cart is disabled for invalid configurations
* logo upload rejects invalid file types and oversized files

Additional useful tests with more time:

* component integration test for full configuration flow
* accessibility tests for keyboard navigation and ARIA states
* visual regression tests for product preview and logo placement

## Conceptual Considerations

Several conceptual decisions influenced the implementation:

### Data-Driven Configuration

The configurator was designed to be driven by product data rather than hardcoded business rules. Option availability and pricing are derived from the product configuration and conditional rules. This allows new products and option combinations to be introduced without frontend code changes.

### Separation of State and Presentation

The parent configurator component owns product state, validation, availability rules and pricing calculations, while child components focus on rendering and user interaction. This improves maintainability and reusability.

### User Feedback and Error Prevention

The configurator provides immediate feedback for invalid selections and upload validation. Instead of silently correcting user input, the interface makes issues visible and guides the user toward a valid configuration.

### Progressive Enhancement

The implementation prioritizes the core user journey first (selection, preview, pricing and validation). Additional features such as image dimension validation and backend integration can be added without major architectural changes.

### Performance

Angular Signals and computed values were chosen to minimize unnecessary recalculations and keep state updates predictable. Only the affected parts of the UI react to user changes.

## Modern CSS Techniques Used

### CSS Custom Properties (Design Tokens)

CSS variables are used for colors, spacing, typography and border radius values.

Example:

```css
--color-primary
--spacing-2
--radius-md
```

This improves consistency and makes future design updates easier.

### CSS Grid

The main configurator layout uses CSS Grid to create a responsive two-column structure for the product preview and configuration controls.

Grid was chosen because it provides a cleaner solution for page-level layout than nested flex containers.

### Flexbox

Flexbox is used for smaller UI elements such as:

* option groups
* button rows
* header layout
* action areas

Flexbox provides simple alignment and spacing for one-dimensional layouts.

### Responsive Design

Media queries adapt the layout for smaller screens by switching from a two-column layout to a single-column layout. This ensures usability on tablets and mobile devices.

### CSS Transitions

Subtle transitions are applied to buttons, color selectors and interactive controls to improve perceived responsiveness and create a smoother user experience.

### CSS Filters

The product preview uses CSS filter functions such as `hue-rotate()` and `saturate()` to generate color variations from a single base image.

This reduces the need for multiple image assets and demonstrates how the provided `relativeToBaseColor` data can be utilized efficiently.


## What I Would Improve With More Time

* Add real API integration with Angular `HttpClient`
* Add loading and error states for pricing requests
* Add image dimension validation for logo upload
* Improve logo positioning precision
* Add automated tests for the full user flow
* Add accessibility improvements and screen reader testing
* Add final Add to Cart payload handling
* Add full internationalization and currency formatting


## Data Structure Feedback and Implemented Variant

The provided backend data structure was treated as a useful draft, but not as a final layout.

For this prototype, I kept the structure mostly unchanged because it already contains the information needed for rendering options, validating dependent choices and calculating price modifiers.

### Improvements I can Suggest

#### 1. Machine-Readable File Size Values

Current:

```json
"maxFileSize": "12MB"
```

Suggested:

```json
"maxFileSizeInBytes": 12582912
```

This avoids parsing formatted strings in the frontend and makes validation easier.

#### 2. Final Price Calculation Endpoint

The current pricing API provides a modifier per option value. This is sufficient for displaying an estimated price in the frontend, but the backend should remain the source of truth. Maybe an additional endpoint which receives the complete configuration and returns the final validated price.

#### 3. More Explicit Conditional Rules

The current `conditionalOptionDetails` structure works for the provided example.

For larger product catalogs, a more explicit rule format would improve readability and extensibility by clearly separating conditions from effects.


