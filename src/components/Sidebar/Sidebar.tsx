import React, { memo } from "react";
import styles from "../../styles/components/sidebar.module.scss";
import filterOptions from "../../data/filterOptions";
import { CheckboxButton } from "./CheckboxButton";
import { useSelector } from "react-redux";
import { addTransfers, initializeTransfers } from "../../redux/filter/slice";
import { useEffect } from "react";
import { setFilters } from "../../redux/ticketsList/slice";
import { useAppDispatch } from "../../redux/store";
import { selectTransfers } from "../../redux/filter/selectors";

const Sidebar = memo(() => {
  const transfers = useSelector(selectTransfers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeTransfers(filterOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Monitoring transfers changes and updating activeFilters
  useEffect(() => {
    const activeFilters = transfers
      .filter((transfer) => transfer.checked)
      .map((transfer) => transfer.value);

    dispatch(setFilters(activeFilters));
  }, [transfers, dispatch]);

  const pickTransfers = (value: string) => {
    dispatch(addTransfers(value));
  };

  return (
    <div>
      <form className={styles.transfers}>
        <legend>Количество пересадок</legend>
        {transfers.map(({ value, checked, label }) => (
          <CheckboxButton
            id={value}
            key={value}
            label={label}
            pickTransfers={() => pickTransfers(value)}
            value={value}
            checked={checked}
          />
        ))}
      </form>
    </div>
  );
});

export default Sidebar;
