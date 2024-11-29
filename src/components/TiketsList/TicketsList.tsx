import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import styles from "../../styles/components/ticket-list.module.scss";

import Ticket from "../Ticket/Ticket";
import Skeleton from "./Skeleton";

import useFetchInitialData from "../../hooks/useFetchInitialData";
import useFetchTicketsData from "../../hooks/useFetchTicketsData";


const TiketsList = () => {

  const { tickets, error, isLoad, loadedTickets } = useSelector((state: RootState) => state.ticketsSlice);

  useFetchInitialData();
  useFetchTicketsData();

  console.log("tickets", tickets);
  console.log("loadedTickets", loadedTickets);


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
