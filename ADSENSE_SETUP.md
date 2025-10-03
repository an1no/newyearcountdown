# Google AdSense Setup Guide for New Year Timer

This guide will help you set up Google AdSense to monetize your New Year countdown timer.

## 1. Create Google AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click "Get started" and sign in with your Google account
3. Add your website URL when prompted
4. Choose your country/territory and select your payment currency
5. Review and accept the AdSense Terms & Conditions

## 2. Add Your Site to AdSense

1. In your AdSense dashboard, click "Sites" in the left menu
2. Click "Add site" and enter your domain
3. Choose "Auto ads" or "Ads by ad unit" (recommended: both)
4. AdSense will review your site (can take 1-14 days)

## 3. Get Your Publisher ID

Once approved:
1. Go to your AdSense dashboard
2. Click "Account" → "Account information"
3. Copy your Publisher ID (format: `ca-pub-1234567890123456`)

## 4. Create Ad Units

1. In AdSense dashboard, go to "Ads" → "By ad unit"
2. Click "Create ad unit"
3. Create these ad units:

### Recommended Ad Units:
- **Top Banner**: Responsive display ad (728x90 desktop, 320x50 mobile)
- **Mobile Banner**: 320x50 mobile banner
- **Desktop Banner**: 728x90 leaderboard
- **Responsive Banner**: Responsive display ad
- **Footer Banner**: 728x90 leaderboard

For each ad unit:
1. Choose "Display ads"
2. Enter ad unit name (e.g., "New Year Timer - Top Banner")
3. Choose "Responsive" for most ads
4. Click "Create"
5. Copy the Ad unit ID (format: `1234567890`)

## 5. Configure Your App

1. Open `src/config/adsense.ts`
2. Replace placeholder values:

```typescript
export const ADSENSE_CONFIG = {
  // Replace with your actual Publisher ID
  publisherId: "ca-pub-1234567890123456", // Your actual ID here
  
  // Replace with your actual Ad Slot IDs
  adSlots: {
    topBanner: "1234567890",        // Your top banner ad unit ID
    mobileBanner: "1234567891",     // Your mobile banner ad unit ID
    desktopBanner: "1234567892",    // Your desktop banner ad unit ID
    responsiveBanner: "1234567893", // Your responsive banner ad unit ID
    sidebarSquare: "1234567894",    // Your square ad unit ID
    footerBanner: "1234567895",     // Your footer banner ad unit ID
  },
  
  settings: {
    autoAds: true,         // Enable Google Auto Ads
    responsiveAds: true,   // Enable responsive ad units
    lazyLoading: true,     // Enable lazy loading
  }
};
```

## 6. Deploy Your Site

Deploy your countdown timer to a web hosting service:

### Option 1: Netlify (Recommended)
1. Build your project: `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop your `dist` folder
4. Get your live URL

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Get your live URL

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 7. AdSense Policy Compliance

Ensure your site meets AdSense policies:

### Content Requirements:
- ✅ Original, high-quality content
- ✅ Clear navigation and user experience
- ✅ Privacy policy (required)
- ✅ Terms of service (recommended)
- ✅ Contact information

### Technical Requirements:
- ✅ Mobile-friendly design
- ✅ Fast loading times
- ✅ HTTPS enabled
- ✅ No prohibited content

## 8. Add Required Pages

Create these additional pages for compliance:

### Privacy Policy (Required)
Create `src/pages/Privacy.tsx` with:
- Data collection practices
- Cookie usage
- Third-party services (Google AdSense)
- User rights and contact info

### Terms of Service (Recommended)
Create `src/pages/Terms.tsx` with:
- Website usage terms
- Limitation of liability
- Intellectual property rights

## 9. Optimize Ad Performance

### Best Practices:
1. **Ad Placement**: Above the fold and in content breaks
2. **Ad Sizes**: Use responsive sizes for better performance
3. **Loading**: Implement lazy loading for better page speed
4. **Testing**: A/B test different placements
5. **Mobile**: Ensure ads work well on mobile devices

### Ad Performance Tips:
- Place ads where users naturally look
- Don't place too many ads (affects user experience)
- Use contrasting colors to make ads visible
- Monitor performance in AdSense dashboard

## 10. Monitor and Optimize

1. **AdSense Dashboard**: Check earnings, performance, and optimization tips
2. **Google Analytics**: Track user behavior and ad interaction
3. **Page Speed**: Monitor loading times with ads
4. **User Experience**: Ensure ads don't hurt usability

## Expected Revenue

Revenue depends on:
- **Traffic volume**: More visitors = more potential revenue
- **Traffic quality**: Engaged users click more ads
- **Geographic location**: Some countries have higher ad rates
- **Seasonal trends**: New Year traffic might be higher during December/January
- **Ad placement**: Strategic placement increases click-through rates

### Realistic Expectations:
- **New sites**: $0.01 - $0.50 per 1000 visitors
- **Established sites**: $1 - $5 per 1000 visitors
- **High-quality traffic**: $5+ per 1000 visitors

## Troubleshooting

### Common Issues:

1. **Ads not showing**:
   - Check AdSense approval status
   - Verify Publisher ID and Ad Unit IDs
   - Check browser ad blockers
   - Wait 24-48 hours after setup

2. **Policy violations**:
   - Review AdSense policies
   - Remove prohibited content
   - Add required pages (Privacy Policy)
   - Ensure original content

3. **Low earnings**:
   - Increase website traffic
   - Improve ad placement
   - Optimize for mobile
   - Create engaging content

## Support

- [AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [AdSense Community](https://support.google.com/adsense/community)

Remember: AdSense approval can take time. Focus on creating quality content and good user experience while waiting for approval.