# How to Change Project Images - Manual Guide

## Overview
Project images are stored in `/attached_assets/generated_images/` and are served at `/assets/generated_images/` via the server.

## Method 1: Change Category-Level Images (All Projects in Category)

**Location:** `server/storage.ts` - Lines 56-70

**Steps:**
1. Add your new image file to `/attached_assets/generated_images/` folder
2. Open `server/storage.ts`
3. Find the `getProjectThumbnail` function (around line 56)
4. Update the image path for the category you want to change

**Example:**
```typescript
private getProjectThumbnail(category: string, title: string): string {
  const categoryImages: Record<string, string> = {
    "it": "/assets/generated_images/YOUR_NEW_IMAGE.png",  // Changed this
    "cs": "/assets/generated_images/IT_Computer_Science_project_thumbnail_f71a1bbf.png",
    // ... other categories
  };
  return categoryImages[category] || categoryImages["it"];
}
```

**Note:** This changes the image for ALL projects in that category.

---

## Method 2: Change Individual Project Image (Specific Project Only)

**Location:** `server/storage.ts` - Find the specific project in the `projects` array

**Steps:**
1. Add your new image file to `/attached_assets/generated_images/` folder
2. Open `server/storage.ts`
3. Find the project you want to change (search by title)
4. Replace the `thumbnail` line with a direct path

**Example:**
```typescript
{
  title: "E-Commerce Website with Payment Gateway Integration",
  description: "...",
  category: "it",
  // ... other fields
  thumbnail: "/assets/generated_images/YOUR_CUSTOM_IMAGE.png",  // Direct path instead of helper function
  samplePptUrl: "/samples/ecommerce-ppt.pdf",
  popular: 45,
}
```

**Before (using helper):**
```typescript
thumbnail: this.getProjectThumbnail("it", "E-Commerce Website with Payment Gateway Integration"),
```

**After (direct path):**
```typescript
thumbnail: "/assets/generated_images/my-custom-ecommerce-image.png",
```

---

## Method 3: Add New Images and Update Mapping

**Steps:**
1. **Add Image File:**
   - Place your new image in `/attached_assets/generated_images/`
   - Supported formats: PNG, JPG, JPEG, WebP
   - Recommended size: 400x300px or 16:9 aspect ratio

2. **Update Category Mapping (if needed):**
   - Edit `getProjectThumbnail` function in `server/storage.ts`
   - Add or update the category entry:
   ```typescript
   "it": "/assets/generated_images/YOUR_NEW_IMAGE.png",
   ```

3. **Or Use Direct Path:**
   - For individual projects, use the direct path method (Method 2)

---

## Current Image Files Available

Located in `/attached_assets/generated_images/`:
- `IT_Computer_Science_project_thumbnail_f71a1bbf.png` (used for IT & CS)
- `ECE_Electronics_project_thumbnail_c7385ad9.png` (used for ECE & Diploma)
- `Electrical_engineering_project_thumbnail_32fc478c.png` (used for Electrical)
- `Mechanical_engineering_project_thumbnail_43cbef9f.png` (used for Mechanical)
- `Civil_engineering_project_thumbnail_d89a625e.png` (used for Civil)

---

## Quick Reference

### To change ALL IT projects:
Edit line 59 in `server/storage.ts`:
```typescript
"it": "/assets/generated_images/NEW_IMAGE.png",
```

### To change ONE specific project:
Find the project in the array and change:
```typescript
thumbnail: "/assets/generated_images/SPECIFIC_IMAGE.png",
```

### Image Path Format:
- Server path: `/assets/generated_images/FILENAME.png`
- File location: `/attached_assets/generated_images/FILENAME.png`
- The server automatically serves files from `attached_assets` at `/assets/`

---

## Testing Your Changes

1. Restart the server:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. Check the API:
   ```bash
   curl http://localhost:3000/api/projects | grep thumbnail
   ```

3. View in browser:
   - Go to http://localhost:3000
   - Check project cards to see new images

---

## Tips

- **Image Naming:** Use descriptive names like `ecommerce-project-thumbnail.png`
- **Image Size:** Keep images optimized (under 500KB recommended)
- **Aspect Ratio:** 16:9 or 4:3 works best for project cards
- **File Format:** PNG with transparency or JPG for photos
- **Backup:** Keep original images as backup before replacing

