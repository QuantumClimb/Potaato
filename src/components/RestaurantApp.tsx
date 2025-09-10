import { useState, useEffect } from "react";
import DishCard from "./DishCard";
import SplashScreen from "./SplashScreen";
import CheckoutModal from "./CheckoutModal";
import OrderConfirmation from "./OrderConfirmation";

interface Dish {
  week: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

interface Config {
  appName: string;
  maxOrdersPerWeek: number;
  whatsappNumber: string;
  checkoutMessageTemplate: string;
  currentWeek: number;
  weeklyDishes: Dish[];
}

interface OrderDetails {
  dish: Dish;
  quantity: number;
  total: number;
}

const RestaurantApp = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/config.json');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Failed to load config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getCurrentDish = (): Dish | null => {
    if (!config) return null;
    return config.weeklyDishes.find(dish => dish.week === config.currentWeek) || null;
  };

  const generateWhatsAppLink = (orderDetails: OrderDetails): string => {
    if (!config) return '';
    
    let message = config.checkoutMessageTemplate
      .replace('{{dishName}}', orderDetails.dish.name)
      .replace('{{quantity}}', orderDetails.quantity.toString());
    
    const encodedMessage = encodeURIComponent(message);
    
    // Clean phone number (remove + and any spaces)
    const cleanPhoneNumber = config.whatsappNumber.replace(/[+\s]/g, '');
    
    // Support both mobile and web WhatsApp
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const baseUrl = isMobile ? 'https://wa.me/' : 'https://web.whatsapp.com/send?phone=';
    
    return `${baseUrl}${cleanPhoneNumber}&text=${encodedMessage}`;
  };

  const handleBookNow = () => {
    setShowCheckout(true);
  };

  const handleCheckoutConfirm = (orderDetails: OrderDetails) => {
    setCurrentOrder(orderDetails);
    setShowCheckout(false);
    setShowConfirmation(true);
  };

  const handleProceedToWhatsApp = () => {
    if (currentOrder) {
      const whatsappLink = generateWhatsAppLink(currentOrder);
      window.open(whatsappLink, '_blank');
      setShowConfirmation(false);
      setCurrentOrder(null);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-nunito text-muted-foreground">Loading delicious dishes...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-nunito text-destructive">Failed to load restaurant data</p>
        </div>
      </div>
    );
  }

  const currentDish = getCurrentDish();

  if (!currentDish) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-nunito text-muted-foreground">No dish available for this week</p>
        </div>
      </div>
    );
  }

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <h1 className="font-baloo text-5xl font-bold text-primary mb-2">
          {config.appName}
        </h1>
        <p className="font-nunito text-muted-foreground text-lg">
          Fresh. Weekly. Delicious.
        </p>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 pb-8">
        <div className="text-center mb-8">
          <h2 className="font-baloo text-2xl font-semibold text-foreground mb-2">
            This Week's Special
          </h2>
          <p className="font-nunito text-muted-foreground">
            Week {config.currentWeek} • Limited time only
          </p>
        </div>

        <DishCard
          dish={currentDish}
          availableOrders={config.maxOrdersPerWeek}
          onBookNow={handleBookNow}
        />

        {/* Footer */}
        <footer className="text-center mt-12 py-6 border-t border-border">
          <p className="font-nunito text-sm text-muted-foreground">
            Made with 🥔 by {config.appName}
          </p>
        </footer>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        dish={currentDish}
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onConfirm={handleCheckoutConfirm}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmation
        orderDetails={currentOrder}
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setShowCheckout(true);
        }}
        onProceedToWhatsApp={handleProceedToWhatsApp}
      />
    </div>
  );
};

export default RestaurantApp;