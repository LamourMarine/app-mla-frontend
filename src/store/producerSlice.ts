import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { producerAPI } from "../api";
import type { Producer } from "../Types/producer";
import type { AppDispatch } from ".";


interface ProducersState {
  producers: Producer[];
  deactivatedProducers: Producer[];
  loading: boolean;
  error: string | null;
}

const initialState: ProducersState = {
  producers: [],
  deactivatedProducers: [],
  loading: false,
  error: null,
};

export const producerSlice = createSlice({
  name: "producer",
  initialState,
  reducers: {
    addProducer: (state, action: PayloadAction<Producer>) => {
      state.producers.push(action.payload); // ajoute un producteur actif
    },
    deactivateProducer: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const producer = state.producers.find((p) => p.id === id);
      state.producers = state.producers.filter((p) => p.id !== id);
      if (producer) {
        state.deactivatedProducers.push(producer);
      }
    },
    setProducers: (state, action: PayloadAction<Producer[]>) => {
      state.producers = action.payload; // remplace la liste complète des actifs
    },
    setDeactivatedProducers: (state, action: PayloadAction<Producer[]>) => {
      state.deactivatedProducers = action.payload; // met à jour la liste des désactivés
    },
    reactivateProducer: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const producer = state.deactivatedProducers.find((p) => p.id === id);
      state.deactivatedProducers = state.deactivatedProducers.filter((p) => p.id !== id);
      if (producer) {
        state.producers.push(producer);
      }
    },
  },
});

export const {
  addProducer,
  deactivateProducer,
  setProducers,
  setDeactivatedProducers,
  reactivateProducer,
} = producerSlice.actions;
export default producerSlice.reducer;

// Define a thunk that dispatches those action creators
export const fetchProducers = () => async (dispatch: AppDispatch) => {
  try {
    const active = await producerAPI.getAll();
    dispatch(setProducers(active));

    const deactivatedResponse = await producerAPI.getDeactivated();
    dispatch(setDeactivatedProducers(deactivatedResponse.data));
  } catch (error) {
    console.error(error);
  }
};