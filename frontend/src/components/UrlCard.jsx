import styles from "./UrlCard.module.css";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";

export default function UrlCard({ url }) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.viewsContainer}>
                <IoEye />
                <p>{url.clicks} clicks</p>
            </div>
            <h3>{url.code}</h3>
            <p>{url.originalUrl}</p>
            <div className={styles.btnContainer}>
                <Link className={styles.analyticsBtn} to={`/analytics/${url.code}`} >
                    View analytics
                </Link>
            </div>
        </div>
    );
}