import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchId, fetchTickets } from "./asyncActions";
import {
  handleFulfilled,
  handlePendingID,
  handleRejected,
  handleRejectedTickets,
  handlePendingTickets,
} from "../../utils/handleStatus";
import { v4 as uuidv4 } from "uuid";

import { sortTickets } from "../../utils/sortTickets";

const initialState = {
  searchId: "",
  status: "idle",
  tickets: [],
  loadedTickets: [],
  stop: false,
  startSlice: 5,
  error: null,
  activeSort: null, 
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    showMoreTickets: (state) => {
      if (state.stop) return;
      // If sorting is active, sort the tickets, otherwise we use the original array
      const currentSortedTickets = state.activeSort
        ? sortTickets(state.loadedTickets, state.activeSort)
        : state.loadedTickets;

      if (state.startSlice < state.loadedTickets.length) {
        // Take the next portion of tickets from the sorted array
        const nextTickets = currentSortedTickets.slice(
          state.startSlice,
          Math.min(state.startSlice + 5, state.loadedTickets.length)
        );
        // Update the displayed tickets and index for the next portion
        state.tickets = [...state.tickets, ...nextTickets];
        state.startSlice += 5;
      } 
    },
    setActiveSort: (state, action) => {
      const sortType = action.payload;
      state.activeSort = sortType;

      // Sorting unique tickets
      const sortedTickets = sortTickets(state.loadedTickets, sortType);

      // Limit the number of tickets displayed to the current startSlice value
      state.tickets = sortedTickets.slice(0, state.startSlice);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, handlePendingID)
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        handleFulfilled(state, action);
      })
      .addCase(fetchSearchId.rejected, handleRejected)
      .addCase(fetchTickets.pending, handlePendingTickets)
      .addCase(fetchTickets.fulfilled, (state, action) => {
        const ticketsWithId = action.payload.tickets.map((ticket) => ({
          ...ticket,
          id: uuidv4(), // Generating a unique ID for each ticket
        }));

        state.loadedTickets.push(...ticketsWithId);

        if (state.activeSort) {
          const sortedTickets = sortTickets(
            state.loadedTickets,
            state.activeSort
          );
          state.tickets = sortedTickets.slice(0, state.startSlice);
        } else {
          // If sorting is not active, just take the first 5
          if (state.tickets.length === 0) {
            state.tickets = state.loadedTickets.slice(0, 5);
          }
        }
        state.stop = action.payload.stop;
        handleFulfilled(state, action);
      })
      .addCase(fetchTickets.rejected, handleRejectedTickets);
  },
});

export const {
  showMoreTickets,
  getCheapestTicket,
  getFastestTicket,
  setActiveSort,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
