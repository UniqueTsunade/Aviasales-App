import React from "react";
import styles from "../../styles/components/sort-navigation.module.scss";
import { setActiveSort } from "../../redux/ticketsList/slice";
import { useAppDispatch } from "../../redux/store";

type RadioButtonProps = {
  value: string;
  id: string;
  label: string;
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  id,
  label,
  handleOptionChange,
  checked,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActiveSort(e.target.value));
    handleOptionChange(e);
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
