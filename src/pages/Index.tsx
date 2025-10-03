import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Fireworks } from "@/components/Fireworks";

const Index = () => {
  const [time, setTime] = useState(0);

  // New Year countdown calculation
  useEffect(() => {
    const calculateNewYearTime = () => {
      const now = new Date();
      const newYear = new Date(2026, 0, 1); // January 1, 2026
      const diff = newYear.getTime() - now.getTime();
      setTime(Math.max(0, Math.floor(diff / 1000)));
    };
    calculateNewYearTime();
    const interval = setInterval(calculateNewYearTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours: hrs, minutes: mins, seconds: secs };
  };

  const timeData = formatTime(time);

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
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 relative">
      <Fireworks />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
              New Year 2026 • Countdown          
          </h1>
        </div>

        {/* Main Display */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 mb-8 border-2 border-amber-400 shadow-2xl">
          <DigitalDisplay />
        </div>

        {/* Ad Placeholder */}
        <div className="flex justify-center mt-10 p-6 bg-muted/30 rounded-xl border-4 border-dashed border-border">
          <p className="text-base text-muted-foreground font-mono text-center">
            [ Google AdSense/AdMob Ad Banner Placeholder - 320x100 or Adaptive ]
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
