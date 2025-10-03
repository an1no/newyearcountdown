import { useEffect } from 'react';
import { ADSENSE_CONFIG, getAdClient } from '../config/adsense';

interface GoogleAdProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const GoogleAd: React.FC<GoogleAdProps> = ({ 
  adSlot, 
  adFormat = "auto", 
  style = { display: 'block' },
  className = ""
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={getAdClient()}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Banner Ad Component (728x90 or responsive)
export const BannerAd: React.FC<{ adSlot: string; className?: string }> = ({ 
  adSlot, 
  className = "" 
}) => {
  return (
    <GoogleAd
      adSlot={adSlot}
      adFormat="auto"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      className={className}
    />
  );
};

// Square Ad Component (300x250)
export const SquareAd: React.FC<{ adSlot: string; className?: string }> = ({ 
  adSlot, 
  className = "" 
}) => {
  return (
    <GoogleAd
      adSlot={adSlot}
      adFormat="rectangle"
      style={{ display: 'block', width: '300px', height: '250px' }}
      className={className}
    />
  );
};

// Mobile Banner Ad Component
export const MobileBannerAd: React.FC<{ adSlot: string; className?: string }> = ({ 
  adSlot, 
  className = "" 
}) => {
  return (
    <GoogleAd
      adSlot={adSlot}
      adFormat="auto"
      style={{ display: 'block', width: '320px', height: '100px' }}
      className={`${className} block sm:hidden`}
    />
  );
};

// Desktop Banner Ad Component
export const DesktopBannerAd: React.FC<{ adSlot: string; className?: string }> = ({ 
  adSlot, 
  className = "" 
}) => {
  return (
    <GoogleAd
      adSlot={adSlot}
      adFormat="auto"
      style={{ display: 'block', width: '728px', height: '90px' }}
      className={`${className} hidden sm:block`}
    />
  );
};