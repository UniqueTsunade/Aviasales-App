import { sortTickets } from "./sortTickets";
import { filterTickets } from "./filterTickets";
import { TicketsSliceState } from "../redux/ticketsList/types";

export const updateDisplayedTickets = (state: TicketsSliceState) => {
    // Filter tickets based on active filters
    const filteredTickets = filterTickets(
      state.activeFilters,
      state.loadedTickets
    );
  
    // If sorting is active, apply it to filtered tickets
    const sortedFilteredTickets = state.activeSort
      ? sortTickets(filteredTickets, state.activeSort)
      : filteredTickets;
  
    // Limiting the number of tickets displayed
    state.tickets = sortedFilteredTickets.slice(0, state.startSlice);
 
  };
  