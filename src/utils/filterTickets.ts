import { Ticket } from "../redux/ticketsList/types";

interface FilterTicketsProps {
  filters: Array<string>;
  tickets: Ticket[];
};

type StopsMappingTypes = Record<string, number>;

export const filterTickets = (filters: FilterTicketsProps['filters'], tickets: FilterTicketsProps['tickets']) => {
    if (filters.length === 0 || filters.includes("all")) {
      return tickets; // Returns all tickets if there are no filters
    }

    const stopsMapping:StopsMappingTypes = {
      noTransfers: 0,
      oneTransfers: 1,
      twoTransfers: 2,
      threeTransfers: 3,
    };
  
    const targetStops = filters
      .filter((filter) => stopsMapping[filter] !== undefined)
      .map((filter) => stopsMapping[filter]);
  
    const filtered = tickets.filter((ticket) =>
      ticket.segments.some((segment) => targetStops.includes(segment.stops.length))
    );

    return filtered;
  };
  