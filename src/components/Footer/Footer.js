import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/components/footer.module.scss";
import { showMoreTickets } from "../../redux/ticketsList/slice";
import { fetchTickets } from "../../redux/ticketsList/asyncActions";

const Footer = () => {
  const dispatch = useDispatch();
  const { searchId, stop,tickets, loadedTickets } = useSelector((state) => state.ticketsSlice);


  const handleShowMore = () => {
    dispatch(showMoreTickets()); // Displaying 5 more tickets

    // If the displayed tickets run out, we try to load the next portion
    if (tickets.length + 5 > loadedTickets.length && !stop) {
      dispatch(fetchTickets(searchId));
    }
  };


  return (
    <button onClick={handleShowMore} className={styles.showMore}>
      Показать еще 5 билетов!
    </button>
  );
};

export default Footer;
