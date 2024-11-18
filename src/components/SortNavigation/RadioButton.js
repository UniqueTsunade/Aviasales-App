import React from "react";
import styles from "../../styles/components/sort-navigation.module.scss";
import { useDispatch } from "react-redux";
import { setActiveSort } from "../../redux/ticketsList/slice";

export const RadioButton = ({ value, id, label, selectOption, checked }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(setActiveSort(e.target.value));
    selectOption(e);
  };

  return (
    <div className={styles.sortOptionContainer}>
      <input
        className={styles.sortOption}
        type="radio"
        name="sortOption"
        id={id}
        value={value}
        checked={checked}
        onChange={handleClick}
      />
      <label className={styles.sortOptionTitle} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
