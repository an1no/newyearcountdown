import { useState, useEffect, useRef } from "react";
import { Calendar, Maximize, Minimize, Volume2, VolumeX } from "lucide-react";
import { Fireworks } from "@/components/Fireworks";
import { BannerAd, MobileBannerAd, DesktopBannerAd } from '../components/GoogleAds';
import { ADSENSE_CONFIG, shouldShowAds } from '../config/adsense';

const Index = () => {
  const [time, setTime] = useState(0);
  const [isNewYear, setIsNewYear] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenBtn, setShowFullscreenBtn] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true); // Start with music playing
  const audioRef = useRef<HTMLAudioElement>(null);
  const fireworksAudioRef = useRef<HTMLAudioElement>(null);

  // New Year countdown calculation
  useEffect(() => {
    // FOR TESTING: Set target time to 12 seconds from when component first loads
    const targetTime = new Date(Date.now() + 12 * 1000); // Fixed target time
    const celebrationEnd = new Date(targetTime.getTime() + 5 * 1000); // Celebrate for 5 seconds
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      
      // Check if we're in the celebration period (after countdown ends)
      if (now >= targetTime && now < celebrationEnd) {
        setIsNewYear(true);
        setTime(0);
        return;
      }
      
      // Reset celebration mode after celebration period and start new countdown
      if (isNewYear && now >= celebrationEnd) {
        setIsNewYear(false);
        // This will trigger the useEffect to run again and create a new target time
        return;
      }
      
      // Calculate time remaining to fixed target
      const diff = targetTime.getTime() - now.getTime();
      const remainingTime = Math.max(0, Math.floor(diff / 1000));
      setTime(remainingTime);
      
      // Trigger celebration when countdown reaches zero
      if (remainingTime === 0 && !isNewYear) {
        setIsNewYear(true);
      }
    };
    
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [isNewYear]); // This will re-run when isNewYear changes, creating a new countdown

  // Play fireworks sound when celebration starts
  useEffect(() => {
    if (isNewYear && fireworksAudioRef.current) {
      fireworksAudioRef.current.currentTime = 0; // Reset to beginning
      fireworksAudioRef.current.play().catch(error => {
        console.log('Fireworks audio play failed:', error);
      });
    }
  }, [isNewYear]);

  // Update document title and favicon based on state
  useEffect(() => {
    if (isNewYear) {
      document.title = "Happy New Year!";
      // Change favicon to party emoji
      changeFavicon("🎉");
    } else {
      document.title = "New Year Countdown";
      // Change favicon to clock emoji
      changeFavicon("⏰");
    }
    
    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = "New Year Countdown";
      changeFavicon("⏰");
    };
  }, [isNewYear]);

  // Function to change favicon
  const changeFavicon = (emoji: string) => {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Set font and draw emoji
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, 32, 32);
      
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL();
      
      // Find existing favicon or create new one
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      
      // Update favicon
      favicon.href = dataURL;
    }
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours: hrs, minutes: mins, seconds: secs };
  };

  const timeData = formatTime(time);

  // Fullscreen functionality
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.log('Error attempting to exit fullscreen:', err);
      });
    }
  };

  // Listen for fullscreen changes (e.g., user pressing ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Mouse tracking for fullscreen button visibility
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowFullscreenBtn(true);
      
      // Hide button after 3 seconds of no mouse movement (only in fullscreen)
      if (isFullscreen) {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          setShowFullscreenBtn(false);
        }, 3000);
      }
    };

    const handleMouseLeave = () => {
      if (isFullscreen) {
        setShowFullscreenBtn(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      // Initially hide after 3 seconds in fullscreen
      hideTimeout = setTimeout(() => {
        setShowFullscreenBtn(false);
      }, 3000);
    } else {
      // Always show button when not in fullscreen
      setShowFullscreenBtn(true);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(hideTimeout);
    };
  }, [isFullscreen]);

  // Music functionality
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
        setIsMusicPlaying(true);
      }
    }
  };

  // Setup audio elements
  useEffect(() => {
    // Background music setup
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Set volume to 30%
      
      const handleEnded = () => setIsMusicPlaying(false);
      const handlePlay = () => setIsMusicPlaying(true);
      const handlePause = () => setIsMusicPlaying(false);

      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);

      // Auto-play music when component loads
      const playMusic = async () => {
        try {
          await audioRef.current?.play();
          setIsMusicPlaying(true);
        } catch (error) {
          console.log('Auto-play prevented by browser:', error);
          setIsMusicPlaying(false);
        }
      };

      playMusic();
    }

    // Fireworks sound setup
    if (fireworksAudioRef.current) {
      fireworksAudioRef.current.volume = 0.5; // Set fireworks volume to 50%
      fireworksAudioRef.current.loop = false; // Don't loop fireworks sound
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', () => setIsMusicPlaying(false));
        audioRef.current.removeEventListener('play', () => setIsMusicPlaying(true));
        audioRef.current.removeEventListener('pause', () => setIsMusicPlaying(false));
      }
    };
  }, []);

  const DigitalDisplay = () => {
    const { days, hours, minutes, seconds } = timeData;
    
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <div className="flex flex-col items-center">
          <div className="text-5xl sm:text-7xl md:text-8xl font-mono font-bold text-amber-400 animate-glow-pulse">
            {String(days).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-2">DAYS</div>
        </div>
        <div className="text-5xl sm:text-7xl md:text-8xl font-bold text-red-400">:</div>
        <div className="flex flex-col items-center">
          <div className="text-5xl sm:text-7xl md:text-8xl font-mono font-bold text-red-400 animate-glow-pulse">
            {String(hours || 0).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-2">HOURS</div>
        </div>
        <div className="text-5xl sm:text-7xl md:text-8xl font-bold text-blue-400">:</div>
        <div className="flex flex-col items-center">
          <div className="text-5xl sm:text-7xl md:text-8xl font-mono font-bold text-blue-400 animate-glow-pulse">
            {String(minutes || 0).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-2">MINUTES</div>
        </div>
        <div className="text-5xl sm:text-7xl md:text-8xl font-bold text-amber-400">:</div>
        <div className="flex flex-col items-center">
          <div className="text-5xl sm:text-7xl md:text-8xl font-mono font-bold text-amber-400 animate-glow-pulse">
            {String(seconds || 0).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-2">SECONDS</div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8 relative flex items-center justify-center">
      <Fireworks />
      <article className="max-w-6xl w-full relative z-10">
        {/* Control Buttons */}
        <div className={`absolute top-0 right-0 z-20 flex gap-3 transition-opacity duration-300 ${
          showFullscreenBtn ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Music Button */}
          <button
            onClick={toggleMusic}
            className="p-3 bg-card hover:bg-muted rounded-lg border border-border shadow-lg transition-all duration-200 hover:scale-105"
            title={isMusicPlaying ? "Turn Off Music" : "Turn On Music"}
          >
            {isMusicPlaying ? (
              <Volume2 className="w-5 h-5 text-amber-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-card hover:bg-muted rounded-lg border border-border shadow-lg transition-all duration-200 hover:scale-105"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Maximize className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
            New Year Countdown
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            {isNewYear ? `🎉 HAPPY NEW YEAR ${new Date().getFullYear()}! 🎉` : `New Year ${new Date().getFullYear() + 1} • Countdown to Tomorrow's Beginning`}
          </p>
        </div>

        {/* Top Banner Ad - Hidden in fullscreen */}
        {shouldShowAds(isFullscreen) && (
          <div className="flex justify-center mb-6">
            <BannerAd 
              adSlot={ADSENSE_CONFIG.adSlots.topBanner}
              className="max-w-full"
            />
          </div>
        )}

        {/* Main Display */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 mb-8 border-2 border-amber-400 shadow-2xl">
          {isNewYear ? (
            <div className="text-center">
              <div className="text-6xl sm:text-8xl md:text-9xl font-bold mb-6 animate-bounce">
                🎊 🎉 🎊
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-red-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                HAPPY NEW YEAR!
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground">
                Welcome to {new Date().getFullYear()}! ✨
              </p>
            </div>
          ) : (
            <DigitalDisplay />
          )}
        </div>

        {/* Google Ads - Hidden in fullscreen */}
        {shouldShowAds(isFullscreen) && (
          <div className="flex flex-col items-center gap-4 mt-10">
            {/* Mobile Banner Ad */}
            <MobileBannerAd 
              adSlot={ADSENSE_CONFIG.adSlots.mobileBanner} 
              className="flex justify-center"
            />
            
            {/* Desktop Banner Ad */}
            <DesktopBannerAd 
              adSlot={ADSENSE_CONFIG.adSlots.desktopBanner} 
              className="flex justify-center"
            />
            
            {/* Responsive Banner Alternative */}
            <div className="w-full max-w-4xl mx-auto">
              <BannerAd 
                adSlot={ADSENSE_CONFIG.adSlots.responsiveBanner}
                className="flex justify-center"
              />
            </div>
          </div>
        )}

        {/* Copyright Footer - Hidden in fullscreen */}
        {!isFullscreen && (
          <footer className="text-center mt-8 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              © 2025 New Year Countdown Timer. Made with ❤️ by{" "}
              <a 
                href="https://www.linkedin.com/in/anino-zaridze/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors underline"
              >
                Anino Zaridze
              </a>
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <a 
                href="/privacy" 
                className="text-amber-400 hover:text-amber-300 transition-colors underline"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a 
                href="mailto:your-email@example.com" 
                className="text-amber-400 hover:text-amber-300 transition-colors underline"
              >
                Contact
              </a>
            </div>
          </footer>
        )}
      </article>
      
      {/* SEO Content - Hidden but accessible to search engines */}
      <div className="sr-only">
        <h1>New Year Countdown - Live Timer</h1>
        <p>Experience the most interactive New Year countdown timer with stunning fireworks, background music, and real-time celebration effects. Our countdown timer provides an immersive experience for New Year's Eve, counting down every second until the next New Year arrives.</p>
        
        <h2>Features of Our New Year Countdown Timer</h2>
        <ul>
          <li>Live countdown to New Year with days, hours, minutes, and seconds</li>
          <li>Stunning animated fireworks display</li>
          <li>Background music and celebration sound effects</li>
          <li>Fullscreen mode for big screen displays</li>
          <li>Mobile-responsive design for all devices</li>
          <li>Automatic celebration mode when midnight strikes</li>
          <li>Dynamic browser tab updates with countdown status</li>
        </ul>
        
        <h2>Perfect for New Year's Eve Celebrations</h2>
        <p>Whether you're hosting a New Year's Eve party, watching the countdown at home, or celebrating with friends online, our countdown timer creates the perfect atmosphere. The combination of visual fireworks and audio effects makes every second count towards the biggest celebration of the year.</p>
        
        <h2>How to Use the Countdown Timer</h2>
        <p>Simply visit our website and watch as the timer counts down to the next New Year. Click the music button to enable background music, use the fullscreen button for an immersive big-screen experience, and enjoy the automatic celebration when the countdown reaches zero. The timer works on all devices - desktop, tablet, and mobile.</p>
        
        <h2>New Year Countdown</h2>
        <p>Join millions worldwide in counting down to the New Year. Our timer is synchronized and provides the most accurate countdown to help you celebrate the moment when the old year becomes the new year. Perfect timing for New Year's resolutions, celebrations, and marking the start of a new chapter.</p>
      </div>
      
      {/* Hidden Audio Elements */}
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src="/newyearcountdown/song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <audio
        ref={fireworksAudioRef}
        preload="auto"
      >
        <source src="/newyearcountdown/firework.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
};

export default Index;
