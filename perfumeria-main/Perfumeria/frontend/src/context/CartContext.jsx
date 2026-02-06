import React, { createContext, useContext, useState, useEffect } from 'react';
import CartService from '../api/cart.service';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with DB on mount / auth change
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      console.log('🛒 Fetching cart, token exists:', !!token);
      if (token) {
        try {
          const remoteCart = await CartService.getCart();
          console.log('🛒 Cart loaded from DB:', remoteCart);
          setCart(remoteCart);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        // User logged out, clear cart
        console.log('🛒 No token, clearing cart');
        setCart([]);
      }
    };

    fetchCart();
    window.addEventListener('authChange', fetchCart);
    return () => window.removeEventListener('authChange', fetchCart);
  }, []);

  const addToCart = async (product) => {
    // Optimistic Update
    let newCart = [];
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    setIsCartOpen(true);

    // Sync with backend
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const newQuantity = exists ? exists.quantity + 1 : 1;
        const productData = {
          name: product.name,
          price: typeof product.price === 'string' ? parseInt(product.price.replace(/\./g, '')) : product.price,
          img: product.img
        };
        await CartService.updateCart(product.id || product._id, newQuantity, productData);
      } catch (error) {
        console.error("Failed to sync cart:", error);
      }
    }
  };

  const removeFromCart = async (id) => {
    // Optimistic Update
    setCart((prev) => prev.filter((item) => item.id !== id));

    // Sync
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await CartService.updateCart(id, 0); // 0 quantity = remove
      } catch (error) {
        console.error("Failed to sync cart removal:", error);
      }
    }
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