# AP Dojo Whiteboard Watermarking Guide

## Overview
This guide shows you how to add AP Dojo watermarks to your whiteboard images to protect your content and maintain branding.

## Option 1: Image Processing Scripts (Recommended for bulk processing)

### Prerequisites
```bash
npm install sharp
```

### 1. Text Watermark Script
```bash
node scripts/add-watermark.js
```
- Adds "AP Dojo" text watermark to all images in `public/images/whiteboards/unit2/`
- Configurable position, color, and opacity
- Outputs watermarked images to `public/images/whiteboards/unit2/watermarked/`

### 2. Logo Watermark Script
```bash
node scripts/add-logo-watermark.js
```
- Adds your AP Dojo logo as a watermark
- Falls back to text watermark if logo not found
- Uses logo from `public/images/dojoIcon.png`

### Configuration
Edit the script files to customize:
- `WATERMARK_TEXT`: Text to display
- `WATERMARK_COLOR`: Color of text watermark
- `WATERMARK_OPACITY`: Transparency level
- `LOGO_SIZE`: Size of logo watermark
- `watermarkConfig.position`: Position (bottom-right, bottom-left, top-right, top-left, center)

## Option 2: CSS Overlay Components (No image modification)

### 1. Basic Watermarked Image
```tsx
import { WatermarkedImage } from '@/components/WatermarkedImage';

<WatermarkedImage
  src="/images/whiteboards/unit2/gdp_concept.jpg"
  alt="GDP Concepts"
  width={800}
  height={600}
  watermarkPosition="bottom-right"
  watermarkText="AP Dojo"
/>
```

### 2. Downloadable Image with Prominent Watermark
```tsx
import { DownloadableWatermarkedImage } from '@/components/WatermarkedImage';

<DownloadableWatermarkedImage
  src="/images/whiteboards/unit2/gdp_concept.jpg"
  alt="GDP Concepts"
  width={800}
  height={600}
  watermarkLogo="/images/dojoIcon.png"
  watermarkPosition="bottom-right"
/>
```

## Option 3: Bulk Whiteboard Generation

### 1. Generate from CSV
1. Fill out `scripts/whiteboard-template.csv` with your image details
2. Run: `node scripts/csv-to-whiteboards.js`
3. Review generated `src/data/unit2Whiteboards.ts`

### 2. Generate from Folder
1. Place images in `public/images/whiteboards/unit2/`
2. Run: `node scripts/generate-whiteboards.js`
3. Customize lesson IDs and titles as needed

## Recommended Workflow

1. **Upload Images**: Place your Unit 2 whiteboard images in `public/images/whiteboards/unit2/`

2. **Add Watermarks**: Choose your preferred method:
   - **Image Processing**: Run watermark scripts for permanent watermarks
   - **CSS Overlay**: Use React components for flexible watermarks

3. **Generate Data**: Use bulk generation scripts to create whiteboard entries

4. **Integrate**: Import and use in your study guide components

## Watermark Positions

- `bottom-right`: Most common, doesn't interfere with content
- `bottom-left`: Good alternative to bottom-right
- `top-right/top-left`: Use if bottom interferes with important content
- `center`: Most prominent, use sparingly

## Tips

- **Text Watermarks**: Use for quick branding, easy to customize
- **Logo Watermarks**: More professional, better brand recognition
- **CSS Overlays**: Most flexible, can be toggled on/off
- **Image Processing**: Best for downloadable content, permanent protection
- **Positioning**: Avoid covering important diagram elements
- **Opacity**: 0.7-0.9 works well for most images

## Example Integration

```tsx
// In your whiteboard component
import { unit2Whiteboards } from '@/data/unit2Whiteboards';
import { WatermarkedImage } from '@/components/WatermarkedImage';

{unit2Whiteboards.map((whiteboard) => (
  <div key={whiteboard.id} className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{whiteboard.title}</h3>
    <WatermarkedImage
      src={whiteboard.imageUrl}
      alt={whiteboard.title}
      width={800}
      height={600}
      watermarkPosition="bottom-right"
    />
  </div>
))}
``` 