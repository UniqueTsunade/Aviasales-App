import { useDispatch } from "react-redux";
import { useEffect, useRef, useCallback } from "react";
import { AppDispatch } from '../redux/store';

import { fetchSearchId } from "../redux/ticketsList/asyncActions";

const useFetchInitialData = () => {
  const dispatch: AppDispatch  = useDispatch();
  const hasFetched = useRef(false);

  const fetchInitialData = useCallback(async () => {
    try {
      await dispatch(fetchSearchId()).unwrap();
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchInitialData();
  }, [dispatch, fetchInitialData]);
};


export default useFetchInitialData;