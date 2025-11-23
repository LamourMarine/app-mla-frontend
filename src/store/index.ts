import { configureStore } from "@reduxjs/toolkit";
import producerReducer from "./producerSlice";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice";

// ✅ Variable pour bloquer la sauvegarde pendant le chargement
let isLoadingCart = false;

export const setLoadingCart = (loading: boolean) => {
  isLoadingCart = loading;
};

export const store = configureStore({
  reducer: {
    producer: producerReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

// Subscribe pour sauvegarder automatiquement le panier
store.subscribe(() => {
  // ✅ Ne pas sauvegarder si on est en train de charger
  if (isLoadingCart) {
    console.log("⏸️ Sauvegarde ignorée (chargement en cours)");
    return;
  }

  const state = store.getState();

  try {
    // Récupérer l'utilisateur connecté
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const userId = user.id;
      
      // Sauvegarder le panier avec la clé spécifique à l'utilisateur
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart));
      console.log(`💾 Panier sauvegardé pour user ${userId}`);
    }
  } catch (error) {
    console.error("❌ Erreur sauvegarde panier:", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;