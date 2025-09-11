import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface Dish {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

interface CheckoutModalProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (orderDetails: OrderDetails) => void;
}

interface OrderDetails {
  dish: Dish;
  quantity: number;
  total: number;
}

const CheckoutModal = ({ dish, isOpen, onClose, onConfirm }: CheckoutModalProps) => {
  const [quantity, setQuantity] = useState(1);

  const total = quantity * dish.price;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    const orderDetails: OrderDetails = {
      dish,
      quantity,
      total
    };

    onConfirm(orderDetails);
    onClose();
    
    // Reset form
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-baloo text-2xl text-center text-primary flex items-center justify-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dish Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex gap-3">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-baloo font-semibold text-foreground">{dish.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {dish.currency}{dish.price} per plate
                </p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <p className="font-nunito font-medium text-foreground">Quantity</p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="rounded-full"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <span className="font-baloo text-2xl font-bold w-12 text-center">
                {quantity}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="rounded-full"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>


          {/* Order Summary */}
          <div className="bg-gradient-warm/10 rounded-lg p-4 border border-secondary/20">
            <div className="space-y-2">
              <div className="flex justify-between font-nunito">
                <span>Price per plate:</span>
                <span>{dish.currency}{dish.price}</span>
              </div>
              <div className="flex justify-between font-nunito">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-baloo text-lg font-bold text-primary">
                <span>Total Amount:</span>
                <span>{dish.currency}{total}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 font-nunito"
            >
              Cancel
            </Button>
            <Button
              variant="potato"
              onClick={handleConfirm}
              className="flex-1 font-nunito"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;