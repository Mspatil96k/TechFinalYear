# Social Media Links Configuration Guide

## ✅ Social Media Icons Added to Footer

Social media icons (Facebook, Twitter, Instagram, LinkedIn) have been added to the footer section. They will open in a new tab when clicked.

---

## 🔗 How to Update Your Social Media Links

### Step 1: Open the Configuration File

Open: `client/src/config/socialLinks.ts`

### Step 2: Replace Placeholder URLs

Update the URLs with your actual social media profiles:

```typescript
export const socialLinks = {
  facebook: "https://www.facebook.com/YOUR_FACEBOOK_PAGE",
  twitter: "https://twitter.com/YOUR_TWITTER_HANDLE",
  instagram: "https://www.instagram.com/YOUR_INSTAGRAM_HANDLE",
  linkedin: "https://www.linkedin.com/company/YOUR_LINKEDIN_PAGE",
} as const;
```

### Step 3: Examples

**Facebook:**
- Page: `https://www.facebook.com/techfinalyear`
- Profile: `https://www.facebook.com/yourname`

**Twitter/X:**
- Profile: `https://twitter.com/techfinalyear`
- Or: `https://x.com/techfinalyear`

**Instagram:**
- Profile: `https://www.instagram.com/techfinalyear`

**LinkedIn:**
- Company: `https://www.linkedin.com/company/techfinalyear`
- Personal: `https://www.linkedin.com/in/yourname`

---

## 🎨 Features

- ✅ **Icons**: Facebook, Twitter, Instagram, LinkedIn logos
- ✅ **Hover Effect**: Icons change color on hover
- ✅ **New Tab**: Links open in new tab (`target="_blank"`)
- ✅ **Security**: Includes `rel="noopener noreferrer"` for security
- ✅ **Accessibility**: Includes `aria-label` for screen readers

---

## 🚫 To Remove a Social Media Link

If you don't want to show a particular social media icon:

1. Open `client/src/components/Footer.tsx`
2. Remove or comment out the `<a>` tag for that social media platform

Or set the URL to `#` in `socialLinks.ts` to disable it.

---

## 📝 Quick Update Example

```typescript
// client/src/config/socialLinks.ts
export const socialLinks = {
  facebook: "https://www.facebook.com/techfinalyear",
  twitter: "https://twitter.com/techfinalyear",
  instagram: "https://www.instagram.com/techfinalyear",
  linkedin: "https://www.linkedin.com/company/techfinalyear",
} as const;
```

---

## ✅ After Updating

1. Save the file
2. The changes will be visible immediately in development mode
3. For production, rebuild: `npm run build`

---

## 🎯 Current Location

The social media icons appear in the footer section, in the "About TechFinalYear" column, below the description text.

