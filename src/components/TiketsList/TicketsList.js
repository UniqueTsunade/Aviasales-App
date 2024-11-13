import Ticket from "../Ticket/Ticket";
import {
  fetchSearchId,
  fetchTickets,
} from "../../redux/ticketsList/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const TiketsList = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector(
    (state) => state.ticketsSlice
  );

  // Get searchId and the first portion of tickets
  useEffect(() => {
    const fetchInitialData = async () => {
      // Get searchId
      const result = await dispatch(fetchSearchId()).unwrap();

      // Loading the first batch of tickets
      if (result) {
        dispatch(fetchTickets(result));
      }
    };

    fetchInitialData();
  }, []);


  return (
    <div>
      {tickets.map(({ price, segments, carrier }, index) => (
        <Ticket
          key={`${carrier}-${price}-${index}`}
          price={price}
          segments={segments}
          carrier={carrier}
        />
      ))}
    </div>
  );
};

export default TiketsList;
