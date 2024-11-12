import styles from "../../styles/components/sidebar.module.scss";
import filterOptions from "../../data/filterOptions";
import { CheckboxButton } from "./CheckboxButton";
import { useDispatch, useSelector } from "react-redux";
import { addTransfers, initializeTransfers } from "../../redux/filter/slice";
import { useEffect } from "react";

const Sidebar = () => {
  const transfers = useSelector((state) => state.filterSlice.transfers);
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(initializeTransfers(filterOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickTransfers = (value) => {
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
};

export default Sidebar;
