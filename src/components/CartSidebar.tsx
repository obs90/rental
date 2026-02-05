import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import type { CartItem } from '../App';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
}

export function CartSidebar({ isOpen, onClose, items, onRemoveItem }: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.days), 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Panier ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Votre panier est vide</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.startDate} - {item.endDate}
                      </p>
                      <p className="text-sm">
                        {item.days} jour{item.days > 1 ? 's' : ''} × {item.price}€ = {' '}
                        <span className="text-emerald-600">
                          {item.price * item.days}€
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span className="text-2xl text-emerald-600">{total}€</span>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                  Finaliser la réservation
                </Button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Une caution sera demandée lors du retrait
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
