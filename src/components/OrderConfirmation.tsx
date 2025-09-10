import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle } from "lucide-react";

interface OrderDetails {
  dish: {
    name: string;
    description: string;
    price: number;
    currency: string;
    image: string;
  };
  quantity: number;
  total: number;
}

interface OrderConfirmationProps {
  orderDetails: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToWhatsApp: () => void;
}

const OrderConfirmation = ({ orderDetails, isOpen, onClose, onProceedToWhatsApp }: OrderConfirmationProps) => {
  if (!orderDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-baloo text-2xl text-center text-primary flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Almost There!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Message */}
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="font-nunito text-muted-foreground">
              You're one step away from yummy yummy food! 🤤
            </p>
          </div>

          {/* Dish Details */}
          <div className="bg-gradient-warm/10 rounded-lg p-4 border border-secondary/20">
            <div className="flex gap-3 mb-4">
              <img
                src={orderDetails.dish.image}
                alt={orderDetails.dish.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-baloo text-lg font-semibold text-foreground">
                  {orderDetails.dish.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {orderDetails.dish.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-nunito text-sm">Quantity: {orderDetails.quantity}</span>
                  <span className="font-baloo font-bold text-primary">
                    {orderDetails.dish.currency}{orderDetails.total}
                  </span>
                </div>
              </div>
            </div>
          </div>


          {/* Order Summary */}
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="space-y-2">
              <div className="flex justify-between font-nunito">
                <span>Price per plate:</span>
                <span>{orderDetails.dish.currency}{orderDetails.dish.price}</span>
              </div>
              <div className="flex justify-between font-nunito">
                <span>Quantity:</span>
                <span>{orderDetails.quantity} plate(s)</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-baloo text-xl font-bold text-primary">
                <span>Total Amount:</span>
                <span>{orderDetails.dish.currency}{orderDetails.total}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <p className="font-nunito text-sm text-muted-foreground mb-4">
              Press the WhatsApp button below to complete your order and arrange payment with us!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 font-nunito"
            >
              Edit Order
            </Button>
            <Button
              variant="potato"
              onClick={onProceedToWhatsApp}
              className="flex-1 font-nunito"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send to WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmation;