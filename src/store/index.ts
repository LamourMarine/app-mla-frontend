import { configureStore } from "@reduxjs/toolkit";
import producerReducer from "./producerSlice";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice";

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart)
    }
  } catch (error) {
    console.error('Erreur chargement panier:', error);
  }
  return { items: [], loading: false, error: null };
};

export const store = configureStore({
  reducer: {
    producer: producerReducer,
    product: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartFromStorage(), // charge le panier
  }
});

store.subscribe(() => {
  const state = store.getState();

  try {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  } catch (error) {
    console.error('Erreur sauvegarde panier:', error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;