/* ============================================================
   TRENDZO — App Context
   Global state for: user session + cart
   Any component can read or update these via useApp()
   ============================================================ */

import { createContext, useContext, useEffect, useState } from "react";
import {
  getSession,
  saveSession,
  clearSession,
  getCart,
  saveCart,
} from "../utils/storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  /* -------------------- USER -------------------- */
  const [user, setUser] = useState(null);

  /* -------------------- CART -------------------- */
  const [cart, setCart] = useState([]);

  /* -------------------- LOAD FROM STORAGE ON START -------------------- */
  useEffect(() => {
    setUser(getSession());
    setCart(getCart());
  }, []);

  /* -------------------- PERSIST CART WHENEVER IT CHANGES -------------------- */
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  /* -------------------- AUTH ACTIONS -------------------- */
  function login(userData) {
    const sessionUser = { name: userData.name, email: userData.email };
    setUser(sessionUser);
    saveSession(sessionUser);
  }

  function logout() {
    setUser(null);
    clearSession();
    // Note: we keep the cart so it's still there after re-login
  }

  /* -------------------- CART ACTIONS -------------------- */
  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // already in cart → increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // new item → add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  /* -------------------- DERIVED VALUES -------------------- */
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* -------------------- CONTEXT VALUE -------------------- */
  const value = {
    user,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/* Custom hook — use this inside components instead of useContext directly */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside <AppProvider>");
  }
  return ctx;
}