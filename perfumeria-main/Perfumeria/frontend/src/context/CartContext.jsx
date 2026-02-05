import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const priceValue = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/\./g, '')) 
      : item.price;
      
    return acc + (priceValue * item.quantity);
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        cartTotal, 
        cartCount, 
        isCartOpen, 
        setIsCartOpen 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; // <--- ESTA LLAVE FALTABA PARA CERRAR EL CartProvider

export const useCart = () => useContext(CartContext);