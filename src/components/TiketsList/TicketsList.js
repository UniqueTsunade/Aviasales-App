import Ticket from "../Ticket/Ticket";
import {
  fetchSearchId,
  fetchTickets,
} from "../../redux/ticketsList/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import styles from "../../styles/components/ticket-list.module.scss";
import Skeleton from "./Skeleton";

const TiketsList = () => {
  const dispatch = useDispatch();
  const { tickets, error, isLoad } = useSelector((state) => state.ticketsSlice);

  const hasFetched = useRef(false);

  // Get searchId and the first portion of tickets
  useEffect(() => {
    if (hasFetched.current) return; // Checking whether the request was completed
    hasFetched.current = true;

    const fetchInitialData = async () => {
      try {
        // Get searchId
        const result = await dispatch(fetchSearchId()).unwrap();

        // Loading the first batch of tickets
        if (result) {
          await dispatch(fetchTickets(result)).unwrap();
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchInitialData();
    return () => {
      console.log("TiketsList unmounted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Tickets updated:", tickets);
  }, [tickets]);

  const skeleton = [...new Array(5)].map((_, i) => <Skeleton key={i} /> );
  const ticket = tickets.map(({ id, price, segments, carrier }) => (
    <Ticket
      key={id}
      price={price}
      segments={segments}
      carrier={carrier}
    />
  ))

  return (
    <div>
      {error ? (
        <div className={styles.error}>
          Failed to load tickets. <br /> Please try again.
        </div>
      ) : (
        isLoad ? skeleton : ticket
      )}
    </div>
  );
};

export default TiketsList;
