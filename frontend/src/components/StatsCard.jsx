import styles from './StatsCard.module.css';
import { IoStatsChartSharp } from "react-icons/io5";

export default function StatsCard({ title, stat }) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.left}>
                <h4> {title} </h4>
                <p> {stat}</p>
            </div>
            <div className={styles.statsIcon}>
                <IoStatsChartSharp size={80} />
            </div>
        </div>
    )
}