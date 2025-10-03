import { useState, useEffect } from "react";
import { Calendar, Maximize, Minimize } from "lucide-react";
import { Fireworks } from "@/components/Fireworks";

const Index = () => {
  const [time, setTime] = useState(0);
  const [isNewYear, setIsNewYear] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // New Year countdown calculation
  useEffect(() => {
    // Set target time to 5 minutes from when the component first loads
    const targetTime = new Date(Date.now() + 0.2 * 60 * 1000);
    
    const calculateTimeRemaining = () => {
      const now = new Date();
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
  }, [isNewYear]);

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
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 relative flex items-center justify-center">
      <Fireworks />
      <div className="max-w-6xl w-full relative z-10">
        {/* Fullscreen Button */}
        <div className="absolute top-0 right-0 z-20">
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
            {isNewYear ? "🎉 HAPPY NEW YEAR 2026! 🎉" : "New Year 2026 • Countdown"}
          </p>
        </div>

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
                Welcome to 2026! ✨
              </p>
            </div>
          ) : (
            <DigitalDisplay />
          )}
        </div>

        {/* Ad Placeholder - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="flex justify-center mt-10 p-6 bg-muted/30 rounded-xl border-4 border-dashed border-border">
            <p className="text-base text-muted-foreground font-mono text-center">
              [ Google AdSense/AdMob Ad Banner Placeholder - 320x100 or Adaptive ]
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
