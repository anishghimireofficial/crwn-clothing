import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartitem contains Products to add
  const existingCartItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if found ,increase quantity
  if (existingCartItemIndex !== -1) {
    cartItems[existingCartItemIndex].quantity += 1;
    return [...cartItems];
  }
  //return new arry with modify condition / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
