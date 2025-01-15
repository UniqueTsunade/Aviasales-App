import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/components/app.module.scss";

import logo from "../../assets/logo.png";
import up from "../../assets/up.png";

import SortNavigation from "../SortNavigation";
import Sidebar from "../Sidebar";
import Loader from "../Loader";
import TicketsContainer from "../TicketsContainer";
import useFetchInitialData from "../../hooks/useFetchInitialData";
import useFetchTicketsData from "../../hooks/useFetchTicketsData";
import { selectIsLoad } from "../../redux/ticketsList/selectors";

const App = () => {
  const isLoad = useSelector(selectIsLoad);

  useFetchInitialData();
  useFetchTicketsData();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={styles.app}>
      {isLoad ? (
        <Loader />
      ) : (
        <div>
          <img src={logo} className={styles.logo} alt="Logo" />
        </div>
      )}
      <div className={styles.columns}>
        <Sidebar />
        <div>
          <SortNavigation />
          <TicketsContainer />
        </div>
      </div>

      <button className={styles.scrollToTop} onClick={scrollToTop}>
        <img src={up} alt="Scroll to top" />
      </button>
    </div>
  );
};

export default App;
