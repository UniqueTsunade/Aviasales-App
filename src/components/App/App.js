import React from "react";

import styles from "../../styles/components/app.module.scss";

import logo from "../../assets/logo.png";

import SortNavigation from "../SortNavigation";
import TiketsList from "../TiketsList";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar";

const App = () => {

  return (
    <div className={styles.app}>
      <div>
        <img src={logo} className={styles.logo} alt="Logo" />
      </div>
      <div className={styles.columns}>
        <Sidebar />
        <div>
          <SortNavigation />
          <TiketsList />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
