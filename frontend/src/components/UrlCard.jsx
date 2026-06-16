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
                <Link className={styles.btn} to={`/analytics/${url.code}`} >
                    View analytics
                </Link>
                <a className={styles.btn} href={`http://localhost:5000/url/display/${url.code}`}>
                    Visit site
                </a>
            </div>
        </div>
    );
}