import { Ticket } from "../redux/ticketsList/types";
import { SegmentsType as SortTicketsSegmentType} from "../redux/ticketsList/types";

const calculateTotalTime = (segments: SortTicketsSegmentType[]) => {
  return segments.reduce((sum, seg) => sum + seg.duration, 0);
};

const getCheapestTicket = (tickets: Ticket[]) => {
  return [...tickets].sort((a, b) => a.price - b.price);
};

const getFastestTicket = (tickets: Ticket[]) => {
  return [...tickets].sort((a, b) => {
    const totalTimeA = calculateTotalTime(a.segments);
    const totalTimeB = calculateTotalTime(b.segments);
    
    // If the total time is the same, sort by the number of transfers
    const stopsA = a.segments.length - 1; // Number of transfers
    const stopsB = b.segments.length - 1;

    // First we compare by time, then by the number of transfers
    if (totalTimeA === totalTimeB) {
      return stopsA - stopsB; // Fewer transfers is better
    }

    return totalTimeA - totalTimeB; // Sort by time
  });
};


const getOptimalTickets = (tickets: Ticket[]) => {
  // Create an array with tickets and their price/time ratio
  const ticketsWithRatios = tickets.map(ticket => {
    const totalTime = calculateTotalTime(ticket.segments);
    const ratio = ticket.price / totalTime; // Calculating the price/time ratio
    return { ...ticket, ratio }; // Returning a new object with the added relation
  });

  // Sort by ratio (less is better)
  return ticketsWithRatios.sort((a, b) => a.ratio - b.ratio);
};

export const sortTickets = (tickets: Ticket[], sortType: string) => {
  switch (sortType) {
    case "cheap":
      return getCheapestTicket(tickets);
    case "fast":
      return getFastestTicket(tickets);
    case "optimal":
      return getOptimalTickets(tickets);
    default:
      return tickets; // If sorting is not specified, return the original array
  }
};
