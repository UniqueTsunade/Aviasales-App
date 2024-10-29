import styles from "../../styles/components/sidebar.module.scss";

const Sidebar = () => {
  return (
    <div>
      <form className={styles.transfers}>
        <legend>Количество пересадок</legend>
        <div className={styles.formPart}> 
          <input
            className={styles.customCheckbox}
            type="checkbox"
            name="transfers"
            id="all"
          />
          <label htmlFor="all">Все</label>
        </div>
        <div className={styles.formPart}> 
          <input
            className={styles.customCheckbox}
            type="checkbox"
            name="transfers"
            id="noTransfers"
          />
          <label htmlFor="noTransfers">Без пересадок</label>
        </div>
        <div className={styles.formPart}>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            name="transfers"
            id="oneTransfers"
          />
          <label htmlFor="oneTransfers">1 пересадка</label>
        </div>
        <div className={styles.formPart}>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            name="transfers"
            id="twoTransfers"
          />
          <label htmlFor="twoTransfers">2 пересадки</label>
        </div>
        <div className={styles.formPart}>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            name="transfers"
            id="threeTransfers"
          />
          <label htmlFor="threeTransfers">3 пересадки</label>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
