import React from "react";

import styles from "../../styles/components/ticket.module.scss";

import TicketInfo from "../TicketInfo/TicketInfo";

import { getPriceString } from "../../utils/helpers";
import { Ticket as TicketType } from "../../redux/ticketsList/types";

type TicketProps = {
  key: TicketType['id'];
  price: TicketType['price'];
  segments: TicketType['segments'];
  carrier: TicketType['carrier']
}

const Ticket: React.FC<TicketProps> = ({ price, carrier, segments }) => {
  const carrierCode = carrier;

  return (
    <div className={styles.ticket}>
      <div className={styles.title}>
        <h1>{getPriceString(price)} Р</h1>
        <img
          src={`https://pics.avs.io/99/36/${carrierCode}.png`}
          alt="Company logo"
        />
      </div>
      {segments.map(({ origin, destination, date, duration, stops }, index) => (
        <TicketInfo
          key={index}
          origin={origin}
          destination={destination}
          date={date}
          duration={duration}
          stops={stops}
        />
      ))}
    </div>
  );
};

export default Ticket;
