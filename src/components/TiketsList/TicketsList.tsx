import React, { memo } from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/components/ticket-list.module.scss";

import Ticket from "../Ticket/Ticket";
import Skeleton from "./Skeleton";
import {
  selectError,
  selectIsFirstLoad,
  selectDisplayedTickets,
} from "../../redux/ticketsList/selectors";

const TicketsList = memo(() => {
  const tickets = useSelector(selectDisplayedTickets);
  const error = useSelector(selectError);
  const isFirstLoad = useSelector(selectIsFirstLoad);

  const skeleton = [...new Array(5)].map((_, i) => <Skeleton key={i} />);
  const ticket = tickets.map(({ id, price, segments, carrier }) => (
    <Ticket key={id} price={price} segments={segments} carrier={carrier} />
  ));

  return (
    <div>
      {error ? (
        <div className={styles.error}>
          Failed to load tickets. <br /> Please try again.
        </div>
      ) : isFirstLoad ? (
        skeleton
      ) : (
        ticket
      )}
    </div>
  );
});

export default TicketsList;
