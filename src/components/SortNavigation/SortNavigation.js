
import styles from "../../styles/components/sort-navigation.module.scss";

const SortNavigation = () => {
  return (
    <div>
      <form className={styles.sortForm}>
        <div className={styles.sortOptionContainer}>
          <input
            type="radio"
            name="sortOption"
            className={styles.sortOption}
            id="cheap"
          />
          <label className={styles.sortOptionTitle} htmlFor="cheap">
            Самый дешевый
          </label>
        </div>
        <div className={styles.sortOptionContainer}>
          <input
            type="radio"
            name="sortOption"
            className={styles.sortOption}
            id="fast"
          />
          <label className={styles.sortOptionTitle} htmlFor="fast">
            Самый быстрый
          </label>
        </div>
        <div className={styles.sortOptionContainer}>
          <input
            type="radio"
            name="sortOption"
            className={styles.sortOption}
            id="optimal"
          />
          <label className={styles.sortOptionTitle} htmlFor="optimal">
            Оптимальный
          </label>
        </div>
      </form>
    </div>
  );
};

export default SortNavigation;
