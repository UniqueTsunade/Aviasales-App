import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { fetchSearchId, fetchTickets } from "./asyncActions";
import { v4 as uuidv4 } from "uuid";

import { TicketsSliceState, Status, Ticket } from "./types";

type FetchSearchIdRejectedAction = {
  error: SerializedError;
  payload?: SerializedError;
};

const initialState: TicketsSliceState = {
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
  loadedCount: 0,
  isFirstLoad: true,
  hasFetchedInitialData: false,
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setHasFetchedInitialData: (state, action: PayloadAction<boolean>) => {
      state.hasFetchedInitialData = action.payload;
    },
    addTickets: (state, action: PayloadAction<Ticket[]>) => {
      const ticketsWithId = action.payload.map((ticket) => ({
        ...ticket,
        id: uuidv4(), // Generating a unique ID for each ticket
      }));

      state.loadedTickets.push(...ticketsWithId);
      state.loadedCount += action.payload.length;

      // If this is the first download, display the first 5 tickets
      if (state.isFirstLoad) {
        state.tickets = state.loadedTickets.slice(0, 5);
        state.isFirstLoad = false;
      }
    },
    showMoreTickets: (state) => {
      const nextStartSlice = state.startSlice + 5;

      if (nextStartSlice <= state.loadedTickets.length) {
        state.startSlice = nextStartSlice;
      } else {
        state.startSlice = state.loadedTickets.length;
      }
    },
    setActiveSort: (state, action: PayloadAction<string | null>) => {
      state.activeSort = action.payload;
      state.startSlice = 5;
    },
    setFilters: (state, action: PayloadAction<Array<string>>) => {
      state.activeFilters = action.payload;
      state.startSlice = 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        fetchSearchId.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.searchId = action.payload;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(
        fetchSearchId.rejected,
        (state, action: FetchSearchIdRejectedAction) => {
          state.status = Status.ERROR;
          state.error = action.payload?.message || "Unknown error";
        }
      )
      .addCase(fetchTickets.pending, (state) => {
        state.status = Status.LOADING;
        state.isLoad = true;
        state.error = null;
      })
      .addCase(
        fetchTickets.fulfilled,
        (
          state,
          action: PayloadAction<{ tickets: Ticket[]; stop: boolean }>
        ) => {
          console.log("Received data from server:", action.payload);
          state.stop = action.payload.stop;
          state.isLoad = false;
          state.error = null;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(
        fetchTickets.rejected,
        (state, action: FetchSearchIdRejectedAction) => {
          state.status = Status.ERROR;
          state.error = action.payload?.message || "Unknown error";
          state.isLoad = false;
        }
      );
  },
});

export const {
  addTickets,
  setHasFetchedInitialData,
  showMoreTickets,
  setActiveSort,
  setFilters,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
