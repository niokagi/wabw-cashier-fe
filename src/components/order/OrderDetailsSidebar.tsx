import * as React from 'react';
import { useState } from 'react';
import { PlusCircle, MinusCircle, Trash2, Loader2 } from 'lucide-react';

import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { formatIDR } from '@/utils/formatters';

// 
interface CartItem {
  id: string;
  name: string;
  price: string;
  stock: number;
  quantity: number;
}

interface OrderDetailsSidebarProps extends React.ComponentProps<typeof Sidebar> {
  cart: CartItem[];
  handleUpdateQuantity: (productId: string, newQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
  handleSubmitOrder: (customerName: string, paymentMethod: string) => void;
  isCreatingOrder: boolean;
  totalAmount: number;
}
// 

export function OrderDetailsSidebar({
  cart,
  handleUpdateQuantity,
  handleRemoveItem,
  handleSubmitOrder,
  isCreatingOrder,
  totalAmount,
  ...props
}: OrderDetailsSidebarProps) {
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const submitOrder = () => {
    if (cart.length === 0) {
      console.error("Cart is empty");
      return;
    }
    if (!paymentMethod) {
      console.error("Payment method is required");
      return;
    }
    handleSubmitOrder(customerName || 'Walk-in Customer', paymentMethod);
  };

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh w-[18.5rem] border-l lg:flex flex-col"
      {...props}
    >
      <SidebarHeader className="h-20 flex items-center border-b bg-white">
        <NavUser />
      </SidebarHeader>
      {/* itemlist */}
      <SidebarContent className="flex-1 overflow-hidden p-0 bg-white">
        <ScrollArea className="h-full p-4">
          <h2 className="text-lg font-semibold mb-4">Current Order</h2>
          {cart.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground mt-10">
              No items added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive mt-1"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {/* Item info */}
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusCircle className="h-3 w-3" />
                      </Button>
                      <span className="font-bold text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {/* Subtotal Item */}
                  <p className="text-sm font-medium w-20 text-right">
                    {formatIDR(Number(item.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t mt-auto bg-white">
        <div className="space-y-4">
          <Input
            placeholder="Customer Name (optional)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Select onValueChange={setPaymentMethod} value={paymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select Payment Method..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CASH">Cash</SelectItem>
              <SelectItem value="QRIS">QRIS</SelectItem>
              {/* <SelectItem value="DEBIT_CARD">Debit Card</SelectItem> */}
            </SelectContent>
          </Select>
          <Separator />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>{formatIDR(totalAmount)}</span>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={submitOrder}
            disabled={isCreatingOrder || cart.length === 0}
          >
            {isCreatingOrder ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Create Order'
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}