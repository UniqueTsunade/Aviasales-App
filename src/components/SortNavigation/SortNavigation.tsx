import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/components/sort-navigation.module.scss";

import { changeOption } from "../../redux/sort/slice";
import { RadioButton } from "./RadioButton";
import sortOptions from "../../data/sortOptions";
import { RootState, useAppDispatch } from "../../redux/store";


const SortNavigation = () => {
  const option = useSelector((state: RootState) => state.sortSlice.option);
  const dispatch = useAppDispatch();

  const selectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeOption(e.target.value));
  };

  return (
    <div>
      <form className={styles.sortForm}>
        {sortOptions.map(({ value, label }) => (
          <RadioButton
            key={value}
            id={value}
            value={value}
            label={label}
            checked={option === value}
            selectOption={selectOption}
          />
        ))}
      </form>
    </div>
  );
};

export default SortNavigation;
