import React from "react";
import styles from "../../styles/components/sort-navigation.module.scss";

export const RadioButton = ({ value, id, label, selectOption, checked }) => {
  return (
    <div className={styles.sortOptionContainer}>
      <input
        className={styles.sortOption}
        type="radio"
        name="sortOption"
        id={id}
        value={value}
        checked={checked}
        onChange={selectOption}
      />
      <label className={styles.sortOptionTitle} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
