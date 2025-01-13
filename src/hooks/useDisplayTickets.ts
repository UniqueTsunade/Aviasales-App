import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { RootState } from "../redux/store";

import { showMoreTickets } from "../redux/ticketsList/slice";
import useFetchTickets from "./useFetchTickets";

const useDisplayTickets = () => {
    const fetchTicketsWithRetry = useFetchTickets();

    const dispatch = useAppDispatch();
    const { stop, tickets, loadedTickets } = useSelector((state: RootState) => state.ticketsSlice);

    const handleShowMore = () => {
        // If the currently displayed tickets are not enough, download more
        if (tickets.length + 5 > loadedTickets.length && !stop) {
          fetchTicketsWithRetry()
          .then((success) => {
            // After fetching new tickets, update the displayed tickets
            success && dispatch(showMoreTickets());
          }); // Loading new data
        } else {
          dispatch(showMoreTickets()); // Show more tickets if they are already loaded
        }
      };

      return handleShowMore;
}

export default useDisplayTickets;