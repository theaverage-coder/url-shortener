import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "./Analytics.module.css";
import StatsCard from "../components/StatsCard";

export default function Analytics() {
    const { shortCode } = useParams();
    const [uniqueVisitors, setUniqueVisitors] = useState();
    const [totalClicks, setTotalClicks] = useState();
    const [clickDates, setClickDates] = useState([]);
    const [error, setError] = useState("");
    const [dateCreated, setDateCreated] = useState();
    const [originalUrl, setOriginalUrl] = useState();
    const [averageClicksPerDay, setAverageClicksPerDay] = useState(0);
    const [peakTraffic, setPeakTraffic] = useState(null);

    useEffect(() => {
        getAnalytics();
    }, []);

    const getAnalytics = async () => {
        try {
            const response = await fetch(`http://localhost:5000/url/analytics/${shortCode}`, {
                method: "GET"
            });

            if (response.ok) {
                const data = await response.json();
                setUniqueVisitors(data.uniqueVisitors);
                setTotalClicks(data.totalClicks);
                setClickDates(data.analytics);
                setOriginalUrl(data.originalUrl);
                setDateCreated(data.dateCreated);
            } else {
                setError("Custom URL not found");
            }
        } catch (err) {
            console.log(err);
            setError("Failed to retrieve analytics");
        }
    }

    const lineChartData = {
        labels: clickDates.map(
            click => `${click._id.day}/${click._id.month}`
        ),
        datasets: [
            {
                label: "Clicks",
                data: clickDates.map(
                    click => click.count
                )
            }
        ]
    };


    useEffect(() => {
        if (!dateCreated || !totalClicks || !clickDates) return;

        const totalClicksSinceCreationDate = clickDates.reduce((sum, click) => sum + click.count, 0);

        const daysSinceCreation = Math.max(
            1,
            Math.ceil(
                (Date.now() - new Date(dateCreated).getTime()) /
                (1000 * 60 * 60 * 24)
            )
        );

        const avg = totalClicksSinceCreationDate / daysSinceCreation;

        setAverageClicksPerDay(avg.toFixed(1));

        // Get peak day
        setPeakTraffic(clickDates.reduce((max, click) => click.count > max.count ? click : max));
    }, [dateCreated, totalClicks, clickDates]);

    return (
        <div>
            <h1> URL Analytics </h1>
            <div className={styles.statsContainer}>
                <div className={styles.urlContainer}>
                    <div className={styles.url}>
                        <h2> Custom URL </h2>
                        <p> {shortCode} </p>
                    </div>
                    <div className={styles.url}>
                        <h2> Original URL </h2>
                        <p> {originalUrl} </p>
                    </div>
                </div>
                <div className={styles.cards}>
                    <StatsCard title="Total clicks" stat={totalClicks} />
                    <StatsCard title="Unique visitors" stat={uniqueVisitors} />
                </div>
                <div className={styles.cards}>
                    <StatsCard title="Average clicks per day" stat={averageClicksPerDay} />
                    <StatsCard title="Peak traffic day" stat={peakTraffic} />
                </div>
            </div>
            <div className={styles.chartContainer}>
                <h2> Traffic Over Time</h2>
                <Line data={lineChartData} />
            </div>
        </div>
    )
}