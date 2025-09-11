import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnter = () => {
    setIsAnimating(true);
    // Add a small delay for the animation
    setTimeout(() => {
      onEnter();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-potato-red via-potato-red/90 to-potato-red/80">
      {/* Full Cover Image on Mobile */}
      <div className="relative w-full h-full">
        <img 
          src="/welcome.png" 
          alt="POTAATO" 
          className="w-full h-full object-cover md:object-contain md:max-w-md md:mx-auto md:drop-shadow-2xl"
        />
        
        {/* Enter Button positioned 200px from bottom */}
        <div className="absolute bottom-[200px] left-1/2 transform -translate-x-1/2">
          <Button
            onClick={handleEnter}
            disabled={isAnimating}
            className={`
              bg-potato-red text-white hover:bg-white hover:text-potato-red
              font-baloo text-xl px-8 py-4 h-auto rounded-full
              transform transition-all duration-300 ease-in-out
              hover:scale-105 active:scale-95
              shadow-2xl hover:shadow-white/25
              border-2 border-white hover:border-potato-red
              ${isAnimating ? 'animate-pulse' : ''}
            `}
            size="lg"
          >
            {isAnimating ? 'Entering...' : 'ENTER'}
          </Button>
        </div>
      </div>

      {/* Background Pattern - Hidden on mobile, visible on desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-10 left-10 w-20 h-20 border border-potato-cream/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-potato-cream/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-potato-cream/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-potato-cream/10 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
