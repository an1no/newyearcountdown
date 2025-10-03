// Google AdSense Configuration
// Replace these placeholder values with your actual AdSense data

export const ADSENSE_CONFIG = {
  // Your Google AdSense Publisher ID
  // Get this from your AdSense account: ca-pub-XXXXXXXXXXXXXXXXX
  publisherId: "ca-pub-YOUR_PUBLISHER_ID",
  
  // Ad Slot IDs - Create these in your AdSense account
  adSlots: {
    topBanner: "YOUR_TOP_BANNER_AD_SLOT_ID",
    mobileBanner: "YOUR_MOBILE_AD_SLOT_ID", 
    desktopBanner: "YOUR_DESKTOP_AD_SLOT_ID",
    responsiveBanner: "YOUR_RESPONSIVE_AD_SLOT_ID",
    sidebarSquare: "YOUR_SIDEBAR_SQUARE_AD_SLOT_ID",
    footerBanner: "YOUR_FOOTER_BANNER_AD_SLOT_ID",
  },
  
  // Ad Settings
  settings: {
    autoAds: true, // Enable Google Auto Ads
    responsiveAds: true, // Enable responsive ad units
    lazyLoading: true, // Enable lazy loading for better performance
  }
};

// Helper function to check if ads should be shown
export const shouldShowAds = (isFullscreen: boolean): boolean => {
  return !isFullscreen;
};

// Helper function to get ad client ID
export const getAdClient = (): string => {
  return ADSENSE_CONFIG.publisherId;
};