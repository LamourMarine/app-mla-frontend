import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//Item dans le panier
interface CartItem {
  productId: number;
  quantity: number;
}

//Etat globla du panier
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.productId !== id);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
        const item = state.items.find((i) => 
        i.productId === action.payload.productId );
        if (item) {
            item.quantity = action.payload.quantity;
        }
    },
    clearCart: (state) => {
        state.items = [];
    }
  },
});

export const {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

