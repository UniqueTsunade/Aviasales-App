import React, { memo } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/components/sort-navigation.module.scss";

import { changeOption } from "../../redux/sort/slice";
import { RadioButton } from "./RadioButton";
import sortOptions from "../../data/sortOptions";
import { useAppDispatch } from "../../redux/store";
import { selectOption } from "../../redux/sort/selectors";

const SortNavigation = memo(() => {
  const option = useSelector(selectOption);

  const dispatch = useAppDispatch();

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            handleOptionChange={handleOptionChange}
          />
        ))}
      </form>
    </div>
  );
});

export default SortNavigation;
