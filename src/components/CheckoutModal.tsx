import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
}

const CheckoutModal = ({ dish, isOpen, onClose, onConfirm }: CheckoutModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const total = quantity * dish.price;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert("Please fill in all delivery details");
      return;
    }

    const orderDetails: OrderDetails = {
      dish,
      quantity,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      total
    };

    onConfirm(orderDetails);
    onClose();
    
    // Reset form
    setQuantity(1);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
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
            <Label className="font-nunito font-medium">Quantity</Label>
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

          {/* Customer Details */}
          <div className="space-y-4">
            <h4 className="font-baloo font-semibold text-foreground">Delivery Details</h4>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="font-nunito">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="font-nunito"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-nunito">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="font-nunito"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-nunito">Delivery Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter your complete delivery address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="font-nunito min-h-[80px]"
              />
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