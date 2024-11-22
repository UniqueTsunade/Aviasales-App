import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/components/footer.module.scss";
import { showMoreTickets } from "../../redux/ticketsList/slice";
import { fetchTickets } from "../../redux/ticketsList/asyncActions";
import { useRef, useEffect } from "react";

const Footer = () => {
  const dispatch = useDispatch();
  const { searchId, stop, tickets, loadedTickets, filteredTicketsLoaded } =
    useSelector((state) => state.ticketsSlice);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (filteredTicketsLoaded && !stop) {
      fetchTicketsWithRetry();
    }
  }, [filteredTicketsLoaded, stop]);


  const fetchTicketsWithRetry = async (retries = 10) => {
    if (isLoadingRef.current || stop) return;
    isLoadingRef.current = true;

    let attempts = 0;
    while (attempts < retries) {
      try {
        await dispatch(fetchTickets(searchId)).unwrap();
        return;
      } catch (error) {
        attempts++;
        if (attempts >= retries) {
          console.error("Failed to fetch tickets after retries:", error);
        }
      } finally {
        isLoadingRef.current = false;
      }
    }
  };


  const handleShowMore = () => {
    // If the currently displayed tickets are not enough, download more
    if (tickets.length + 5 > loadedTickets.length && !stop) {
      fetchTicketsWithRetry(); // Loading new data
    } else {
      dispatch(showMoreTickets()); // Show more tickets if they are already loaded
    }
  };

  return (
    <button onClick={handleShowMore} className={styles.showMore}>
      Показать еще 5 билетов!
    </button>
  );
};

export default Footer;
