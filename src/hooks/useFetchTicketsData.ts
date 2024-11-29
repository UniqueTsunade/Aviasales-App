import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "../redux/store";
import { AppDispatch } from '../redux/store';

import { fetchTickets } from "../redux/ticketsList/asyncActions";

const useFetchTicketsData = () => {
  const dispatch: AppDispatch = useDispatch();
  const { searchId } = useSelector((state: RootState) => state.ticketsSlice);
  const hasFetchedTickets = useRef(false);

  useEffect(() => {
    const fetchTicketsData = async () => {
      try {
        await dispatch(fetchTickets()).unwrap();
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    if (searchId && !hasFetchedTickets.current) {
      fetchTicketsData();
      hasFetchedTickets.current = true;
    }
  }, [searchId, dispatch]);
};

export default useFetchTicketsData;
