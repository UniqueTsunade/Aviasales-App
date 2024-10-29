import styles from "../../styles/components/ticket-info.module.scss";

const TicketInfo = () => {
  return (
    <div className={styles.info}>
      <div>
        <p className={styles.title}>MOW – HKT</p>
        <p className={styles.description}>10:45 – 08:00</p>
      </div>
      <div>
        <p className={styles.title}>В пути</p>
        <p className={styles.description}>21ч 15м</p>
      </div>
      <div>
        <p className={styles.title}>2 пересадки</p>
        <p className={styles.description}>HKG, JNB</p>
      </div>
    </div>
  );
};

export default TicketInfo;
