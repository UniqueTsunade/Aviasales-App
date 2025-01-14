import React, { memo } from "react";
import styles from "../../styles/components/footer.module.scss";
import { useAppDispatch } from "../../redux/store";
import { showMoreTickets } from "../../redux/ticketsList/slice";
import { useSelector } from "react-redux";
import {
  selectLoadedTickets,
  selectStartSlice,
} from "../../redux/ticketsList/selectors";

const Footer = memo(() => {
  const startSlice = useSelector(selectStartSlice);
  const loadedTickets = useSelector(selectLoadedTickets);

  const dispatch = useAppDispatch();

  const handleShowMore = () => {
    if (loadedTickets.length === 0) return;
    if (startSlice < loadedTickets.length) {
      dispatch(showMoreTickets());
    }
  };

  const isButtonDisabled = startSlice >= loadedTickets.length;

  return (
    <button
      onClick={handleShowMore}
      className={styles.showMore}
      disabled={isButtonDisabled}
    >
      Показать еще 5 билетов!
    </button>
  );
});

export default Footer;
