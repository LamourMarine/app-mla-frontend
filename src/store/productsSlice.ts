import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/product";
import type { AppDispatch } from ".";
import { productAPI } from "../api";

interface ProductSate {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductSate = {
  products: [],
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await productAPI.getAll();
    dispatch(setProducts(response));
  } catch (error) {
    console.error(error);
  }
};
