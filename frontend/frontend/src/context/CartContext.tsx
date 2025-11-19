import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'addedAt'>) => void;
  removeItem: (productId: string, productType: CartItem['productType']) => void;
  updateQuantity: (productId: string, productType: CartItem['productType'], quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'addedAt'>) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.productType === item.productType
      );

      if (existing) {
        toast.success('Item quantity updated');
        return prev.map((i) =>
          i.productId === item.productId && i.productType === item.productType
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      toast.success('Item added to cart');
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  };

  const removeItem = (productId: string, productType: CartItem['productType']) => {
    setItems((prev) => {
      const filtered = prev.filter(
        (i) => !(i.productId === productId && i.productType === productType)
      );
      toast.success('Item removed from cart');
      return filtered;
    });
  };

  const updateQuantity = (
    productId: string,
    productType: CartItem['productType'],
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(productId, productType);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.productType === productType
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      if (item.productType === 'herb' && 'price' in item.product) {
        return total + (item.product.price.amount * item.quantity);
      }
      if (item.productType === 'honey' && 'packaging' in item.product && item.product.packaging[0]) {
        return total + (item.product.packaging[0].price * item.quantity);
      }
      return total;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

