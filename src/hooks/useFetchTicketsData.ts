import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/store";

import { fetchTickets } from "../redux/ticketsList/asyncActions";

const useFetchTicketsData = () => {
  const dispatch = useAppDispatch();
  const { searchId } = useSelector((state: RootState) => state.ticketsSlice);

  useEffect(() => {
    if (!searchId) return; // Не вызывать, если searchId отсутствует

    console.log("searchId changed:", searchId);
    const fetchTicketsData = async () => {
      try {
        await dispatch(fetchTickets()).unwrap();
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTicketsData();
  }, [searchId, dispatch]);
};

export default useFetchTicketsData;