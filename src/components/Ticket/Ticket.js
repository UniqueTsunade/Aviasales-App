import styles from "../../styles/components/ticket.module.scss";
import companyLogo from "../../assets/company-logo.png";
import TicketInfo from "../TicketInfo/TicketInfo";

const Ticket = () => {
    return (
        <div className={styles.ticket}>
            <div className={styles.title}>
                <h1>13 400 Р</h1>
                <img src={companyLogo} alt="Company logo"/>
            </div>
            <TicketInfo />
            <TicketInfo />
        </div>
    )
}

export default Ticket;