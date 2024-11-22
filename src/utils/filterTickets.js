export const filterTickets = (filters, tickets) => {
    if (filters.length === 0 || filters.includes("all")) {
      return tickets; // Returns all tickets if there are no filters
    }
  
    const stopsMapping = {
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
  