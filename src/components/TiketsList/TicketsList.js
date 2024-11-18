import Ticket from "../Ticket/Ticket";

import {
  fetchSearchId,
  fetchTickets,
} from "../../redux/ticketsList/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import styles from "../../styles/components/ticket-list.module.scss";

const TiketsList = () => {
  const dispatch = useDispatch();
  const { tickets, loadedTickets, error } = useSelector(
    (state) => state.ticketsSlice
  );

  const hasFetched = useRef(false);

  // Get searchId and the first portion of tickets
  useEffect(() => {
    if (hasFetched.current) return; // Проверяем, был ли выполнен запрос
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
            console.error('Failed to fetch initial data:', error);
        }
    };
    fetchInitialData();
    return () => {
      console.log('TiketsList unmounted');
  };
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);




  console.log(`tickets`, tickets);
  console.log(`loadedTickets`, loadedTickets)

  return (
    <div>
      {error ? (
        <div className={styles.error}>Failed to load tickets. <br/> Please try again.</div>
      ) : (
        tickets.map(({ id, price, segments, carrier }) => (
        <Ticket
          key={id}
          price={price}
          segments={segments}
          carrier={carrier}
        />
      )))}
    </div>
  );
};

export default TiketsList;
