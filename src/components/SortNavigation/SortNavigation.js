import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/components/sort-navigation.module.scss";

import { changeOption } from "../../redux/sort/slice";
import { RadioButton } from "./RadioButton";
import sortOptions from "../../data/sortOptions";

const SortNavigation = ({getCheapestTicket}) => {
  const option = useSelector((state) => state.sortSlice.option);
  const dispatch = useDispatch();

  const selectOption = (e) => {
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
            getCheapestTicket={getCheapestTicket}
          />
        ))}
      </form>
    </div>
  );
};

export default SortNavigation;
