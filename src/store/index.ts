import { configureStore } from "@reduxjs/toolkit";
import producerReducer from "./producerSlice";
import productReducer from "./productsSlice"

export const store = configureStore({
  reducer: {
    producer: producerReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;