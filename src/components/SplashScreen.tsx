import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500); // Wait for fade animation
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-hero flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6">
          <img 
            src="/splash.png" 
            alt="POTAATO Logo" 
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
        <div className="mb-1">
          <img 
            src="/text_cream.png" 
            alt="POTAATO" 
            className="h-36 mx-auto object-contain"
          />
        </div>
        <p className="font-nunito text-potato-cream/80 text-lg">
          Loading delicious dishes...
        </p>
        <div className="mt-6">
          <div className="w-16 h-1 bg-potato-cream/30 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-potato-cream rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;