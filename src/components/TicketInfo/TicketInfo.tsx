import React from "react";
import styles from "../../styles/components/ticket-info.module.scss";
import {
  getDepartureTime,
  getArrivalTime,
  getTotalTravelTime,
  getHeaderForCitiesWithTransfers,
} from "../../utils/helpers";
import { SegmentsType as TicketInfoProps } from "../../redux/ticketsList/types";

const TicketInfo: React.FC<TicketInfoProps> = ({
  origin,
  destination,
  date,
  duration,
  stops,
}) => {
  const { departureTime } = getDepartureTime(date);

  return (
    <div className={styles.info}>
      <div>
        <p className={styles.title}>
          {origin} – {destination}
        </p>
        <p className={styles.description}>
          {departureTime} – {getArrivalTime(duration, date)}
        </p>
      </div>
      <div>
        <p className={styles.title}>В пути</p>
        <p className={styles.description}>{getTotalTravelTime(duration)}</p>
      </div>
      <div>
        <p className={styles.title}>{getHeaderForCitiesWithTransfers(stops)}</p>
        <p className={styles.description}>{stops.join(" ")}</p>
      </div>
    </div>
  );
};

export default TicketInfo;
