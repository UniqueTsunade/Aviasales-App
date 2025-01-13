import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearchId, fetchTickets } from "./asyncActions";
import { v4 as uuidv4 } from "uuid";

import { updateDisplayedTickets } from "../../utils/updateDisplayedTickets";
import { TicketsSliceState, Status, Ticket } from "./types";


const initialState:TicketsSliceState = {
  searchId: "",
  status: Status.IDLE,
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
      .addCase(fetchSearchId.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchSearchId.fulfilled, (state, action: PayloadAction<string>) => {
        state.searchId = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.status = Status.LOADING;
        state.isLoad = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<{tickets: Ticket[], stop: boolean}>) => {
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
        state.status = Status.SUCCESS;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = 'Failed to load tickets.';
        state.isLoad = false; // Reset isLoad
        console.error('Error fetching Tickets:', action.error);
      });
  },
});

export const { showMoreTickets, setActiveSort, setFilters } = ticketsSlice.actions;

export default ticketsSlice.reducer;
