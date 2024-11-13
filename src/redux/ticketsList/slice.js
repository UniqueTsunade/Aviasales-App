import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchId, fetchTickets } from "./asyncActions";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../../utils/handleStatus";

const initialState = {
  searchId: "",
  status: "idle",
  tickets: [], 
  loadedTickets: [], 
  stop: false,
  startSlice: 0, 
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    showMoreTickets: (state) => {
      const nextTickets = state.loadedTickets.slice(
        state.startSlice,
        state.startSlice + 5
      ); // Take this portion of tickets (5 pieces)
      state.tickets.push(...nextTickets); // Add them to the displayed ones
      state.startSlice += 5; // Increasing the index
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, handlePending)
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        handleFulfilled(state, action);
      })
      .addCase(fetchSearchId.rejected, handleRejected)
      .addCase(fetchTickets.pending, handlePending)
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loadedTickets.push(...action.payload.tickets); // Save downloaded tickets
        state.stop = action.payload.stop; // Update the stop flag
        // If tickets are not yet displayed, add the first portion
        if (state.tickets.length === 0) {
          const initialTickets = state.loadedTickets.slice(0, 5);
          state.tickets.push(...initialTickets); // First 5 tickets
          state.startSlice = 5;
        }
      })
      .addCase(fetchTickets.rejected, handleRejected);
  },
});

export const { trackBtnClick, setDisplayedTickets, showMoreTickets } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
