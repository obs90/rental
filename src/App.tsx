import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { EquipmentPage } from "./components/EquipmentPage";
import { CartSidebar } from "./components/CartSidebar";

export type Page = "home" | "equipment" | "help" | "reviews";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  startDate: string;
  endDate: string;
  days: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const navigateToEquipment = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage("equipment");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartItemsCount={cartItems.length}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main>
        {currentPage === "home" && (
          <HomePage onNavigateToEquipment={navigateToEquipment} />
        )}
        {currentPage === "equipment" && (
          <EquipmentPage
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}
