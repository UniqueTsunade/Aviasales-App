import React from "react";
import styles from "../../styles/components/sort-navigation.module.scss";
import { useDispatch } from "react-redux";
import { setActiveSort } from "../../redux/ticketsList/slice";
import { AppDispatch } from '../../redux/store';


type RadioButtonProps = {
  value: string, 
  id: string, 
  label: string, 
  selectOption: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  checked: boolean
}

export const RadioButton: React.FC<RadioButtonProps> = ({ value, id, label, selectOption, checked }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
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
