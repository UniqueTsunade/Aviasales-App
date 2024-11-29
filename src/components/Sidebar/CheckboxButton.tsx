import React from "react";
import styles from "../../styles/components/sidebar.module.scss";

type CheckboxButtonProps = {
  id: string,
  label: string, 
  value: string, 
  checked: boolean, 
  pickTransfers: () => void
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({ id, label, value, checked, pickTransfers }) => {
  
  return (
    <div className={styles.formPart}>
      <input
        className={styles.customCheckbox}
        type="checkbox"
        name="transfers"
        id={id}
        value={value}
        checked={checked}
        onChange={pickTransfers}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
