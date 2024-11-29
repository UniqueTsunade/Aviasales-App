import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";

import { fetchTickets } from "../redux/ticketsList/asyncActions";

const useFetchTickets = () => {
  const dispatch: AppDispatch = useDispatch();
  const { stop } = useSelector((state: RootState) => state.ticketsSlice);
  const isLoadingRef = useRef(false);

  const fetchTicketsWithRetry = async (retries = 10) => {
    if (isLoadingRef.current || stop) return;
    isLoadingRef.current = true;

    let attempts = 0;
    let success = false;

    while (attempts < retries) {
      try {
        await dispatch(fetchTickets()).unwrap();
        success = true;
        break;
      } catch (error) {
        attempts++;
      } finally {
        isLoadingRef.current = false;
      }
    }

    if (!success || attempts >= retries) {
      console.error(
        "Failed to fetch tickets after retries:",
        new Error("Max retries exceeded")
      );
    }

    return success;
  };

  return fetchTicketsWithRetry;
};

export default useFetchTickets;