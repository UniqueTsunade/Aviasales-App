import React from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/components/app.module.scss";

import logo from "../../assets/logo.png";
import up from "../../assets/up.png";

import SortNavigation from "../SortNavigation";
import TiketsList from "../TiketsList";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar";
import NotFound from "../NotFound";
import Loader from "../Loader";

const App = () => {
  const activeFilters = useSelector(
    (state) => state.ticketsSlice.activeFilters
  );
  const isLoad = useSelector((state) => state.ticketsSlice.isLoad);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

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
          {activeFilters.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <TiketsList />
              <Footer />
            </>
          )}
        </div>
      </div>
    
      <button className={styles.scrollToTop} onClick={scrollToTop}>
        <img src={up} alt="Scroll to top"/>
      </button>
    </div>
  );
};

export default App;
