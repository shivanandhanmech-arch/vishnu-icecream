# Product Images Notes

## Current Image URLs

The menu items are configured with product images from the provided links. If images don't load, fallback images will automatically be used.

### Arun Ice Cream Products
- Images are sourced from manamaduraionline.com
- If images don't load, they will fallback to generic ice cream images

### Arokya Dairy Products  
- Images use Unsplash placeholders (milk and curd images)
- These should work reliably

## To Update Images

If you need to update any product images:

1. Open `script.js`
2. Find the `defaultMenuItems` array
3. Update the `image` property for any item
4. The format is:
   ```javascript
   image: 'https://your-image-url-here.jpg'
   ```

## Image Requirements

- Recommended size: 600x400px or larger
- Format: JPG, PNG, or WebP
- Ensure images are publicly accessible
- Use HTTPS URLs for security

## Testing Images

1. Open the website in your browser
2. Check if all product images load correctly
3. If an image fails, the fallback will automatically show
4. Open browser console (F12) to see any image loading errors

