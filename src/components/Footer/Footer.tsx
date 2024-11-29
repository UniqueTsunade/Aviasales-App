import React from "react";
import styles from "../../styles/components/footer.module.scss";
import useDisplayTickets from "../../hooks/useDisplayTickets";

const Footer = () => {

  const handleShowMore = useDisplayTickets();

  return (
    <button onClick={handleShowMore} className={styles.showMore}>
      Показать еще 5 билетов!
    </button>
  );
};

export default Footer;
