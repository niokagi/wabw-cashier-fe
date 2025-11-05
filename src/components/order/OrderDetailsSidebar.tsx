import * as React from 'react';
import { PlusCircle, MinusCircle, Trash2, Loader2 } from 'lucide-react';
import emptyBox from "../../assets/icons/empty-box.webp";
// 
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { formatIDR } from '@/utils/formatters';

// 
// interface CartItem {
//   id: string;
//   name: string;
//   price: string;
//   stock: number;
//   quantity: number;
// }

interface OrderDetailsSidebarProps extends React.ComponentProps<typeof Sidebar> {
  cart: any[];
  handleUpdateQuantity: (productId: string, newQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
  handleSubmitOrder: () => void;
  isCreatingOrder: boolean;
  totalAmount: number;
  customerName: string;
  setCustomerName: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}
// 

export function OrderDetailsSidebar({
  cart,
  handleUpdateQuantity,
  handleRemoveItem,
  handleSubmitOrder,
  isCreatingOrder,
  totalAmount,
  customerName,
  setCustomerName,
  paymentMethod,
  setPaymentMethod,
  ...props
}: OrderDetailsSidebarProps) {

  const submitOrder = () => {
    handleSubmitOrder();
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
        <ScrollArea className="h-full p-4 pr-6">
          <h2 className="text-base font-semibold mb-4">Current Order</h2>
          {cart.length === 0 ? (
            <div className="mt-16 grid gap-1">
              <picture>
                <img src={emptyBox} alt="" width={120} className="mx-auto opacity-25" />
              </picture>
              <p className="text-center text-sm text-muted-foreground ms-2">
                No items added yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-5 text-destructive hover:text-destructive hover:bg-transparent mt-1"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {/* Item info */}
                  <div className="flex-1">
                    <p className="text-[0.8rem] font-medium leading-tight truncate w-28">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-none shadow-none text-muted-foreground"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusCircle className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold text-sm w-4 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-none shadow-none text-muted-foreground"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
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
      {/* fields */}
      <SidebarFooter className="p-4 border-t mt-auto bg-white">
        <div className="space-y-4">
          <Input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Select onValueChange={setPaymentMethod} value={paymentMethod} required={true}>
            <SelectTrigger>
              <SelectValue placeholder="Select Payment Method..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CASH">Cash</SelectItem>
              <SelectItem value="QRIS">QRIS</SelectItem>
            </SelectContent>
          </Select>
          {/* <Separator /> */}
          <div className="flex justify-between items-center text-base font-bold mt-6">
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