import React from "react";
import { useSelector } from "react-redux";
import NotFound from "../NotFound";
import TiketsList from "../TiketsList";
import Footer from "../Footer";
import {
  selectActiveFilters,
  selectError,
} from "../../redux/ticketsList/selectors";

const TicketsContainer = () => {
  const activeFilters = useSelector(selectActiveFilters);
  const error = useSelector(selectError);

  if (activeFilters.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <TiketsList />
      {error ? null : <Footer />}
    </>
  );
};

export default TicketsContainer;
