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

import { updateDisplayedTickets } from "../../utils/updateDisplayedTickets";


const initialState = {
  searchId: "",
  status: "idle",
  tickets: [],
  loadedTickets: [],
  stop: false,
  startSlice: 5,
  error: null,
  activeSort: null,
  activeFilters: [],
  filteredTicketsLoaded: false,
  isLoad: false, 
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    showMoreTickets: (state) => {
      if (state.stop) return;

      // Increase the index for the next portion
      const nextStartSlice = state.startSlice + 5;

      // If the index does not exceed the total number of tickets, update the state
      if (nextStartSlice <= state.loadedTickets.length) {
        state.startSlice = nextStartSlice;
        updateDisplayedTickets(state);
      }
      if (nextStartSlice > state.tickets.length) {
        state.filteredTicketsLoaded = true;
      } else {
        state.filteredTicketsLoaded = false;
      }

      console.log("nextStartSlice", nextStartSlice);
    },
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
      updateDisplayedTickets(state);
    },
    setFilters: (state, action) => {
      state.activeFilters = action.payload;
      updateDisplayedTickets(state);
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

        if (state.activeSort || state.activeFilters.length > 0) {
          updateDisplayedTickets(state);
        } else {
          // If sorting is not active, just take the first 5
          if (state.tickets.length === 0) {
            state.tickets = state.loadedTickets.slice(0, 5);
          }
        }
        state.stop = action.payload.stop;
        state.isLoad = false;
        handleFulfilled(state, action);
      })
      .addCase(fetchTickets.rejected, handleRejectedTickets);
  },
});

export const { showMoreTickets, setActiveSort, setFilters } = ticketsSlice.actions;

export default ticketsSlice.reducer;
