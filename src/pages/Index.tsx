import { useEffect } from "react";
import RestaurantApp from "@/components/RestaurantApp";

const Index = () => {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "POTAATO - Fresh Weekly Dishes | Order Now";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Order fresh, delicious weekly dishes from POTAATO. New menu every week featuring premium seafood, continental cuisine, and more. Book now via WhatsApp!');
    }
  }, []);

  return (
    <main>
      <RestaurantApp />
    </main>
  );
};

export default Index;
