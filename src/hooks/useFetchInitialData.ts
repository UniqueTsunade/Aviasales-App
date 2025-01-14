import { useEffect, useCallback } from "react";
import { RootState, useAppDispatch } from "../redux/store";

import { fetchSearchId } from "../redux/ticketsList/asyncActions";
import { useSelector } from "react-redux";
import { setHasFetchedInitialData } from "../redux/ticketsList/slice";

const useFetchInitialData = () => {
  const dispatch = useAppDispatch();
  const hasFetchedInitialData = useSelector(
    (state: RootState) => state.ticketsSlice.hasFetchedInitialData
  );

  const fetchInitialData = useCallback(async () => {
    try {
      await dispatch(fetchSearchId()).unwrap();
      dispatch(setHasFetchedInitialData(true));
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (hasFetchedInitialData) return;
    fetchInitialData();
  }, [fetchInitialData, hasFetchedInitialData]);
};

export default useFetchInitialData;
