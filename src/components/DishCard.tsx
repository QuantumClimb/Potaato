import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Dish {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

interface DishCardProps {
  dish: Dish;
  availableOrders: number;
  onBookNow: () => void;
}

const DishCard = ({ dish, availableOrders, onBookNow }: DishCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-card border-0 bg-card overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardContent className="p-6 text-center">
        <h2 className="font-baloo text-2xl font-bold text-foreground mb-3">
          {dish.name}
        </h2>
        
        <p className="font-nunito text-muted-foreground text-sm leading-relaxed mb-4">
          {dish.description}
        </p>
        
        <div className="mb-4">
          <span className="font-baloo text-3xl font-bold text-primary">
            {dish.currency}{dish.price}
          </span>
        </div>
        
        <div className="mb-6">
          <p className="font-nunito text-sm text-muted-foreground">
            {availableOrders} orders available this week
          </p>
        </div>
        
        <Button
          variant="potato"
          size="lg"
          className="w-full text-lg py-6"
          onClick={onBookNow}
        >
          🍽️ Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default DishCard;