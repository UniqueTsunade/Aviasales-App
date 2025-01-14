import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { filterTickets } from "../../utils/filterTickets";
import { sortTickets } from "../../utils/sortTickets";

const selectTicketsSlice = (state: RootState) => state.ticketsSlice;

export const selectIsLoad = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.isLoad
);

export const selectTickets = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.tickets
);

export const selectError = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.error
);

export const selectIsFirstLoad = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.isFirstLoad
);

export const selectStartSlice = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.startSlice
);

export const selectLoadedTickets = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.loadedTickets
);

export const selectActiveFilters = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.activeFilters
);

export const selectActiveSort = createSelector(
  [selectTicketsSlice],
  (ticketsSlice) => ticketsSlice.activeSort
);

export const selectFilteredTickets = createSelector(
  [selectLoadedTickets, selectActiveFilters],
  (loadedTickets, activeFilters) => filterTickets(activeFilters, loadedTickets)
);

export const selectSortedFilteredTickets = createSelector(
  [selectFilteredTickets, selectActiveSort],
  (filteredTickets, activeSort) =>
    activeSort ? sortTickets(filteredTickets, activeSort) : filteredTickets
);

export const selectDisplayedTickets = createSelector(
  [selectSortedFilteredTickets, selectStartSlice],
  (sortedFilteredTickets, startSlice) =>
    sortedFilteredTickets.slice(0, startSlice)
);
