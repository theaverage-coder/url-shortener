import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";

export default function Analytics() {
    const { code } = useParams();
    const [uniqueVisitors, setUniqueVisitors] = useState();
    const [totalClicks, setTotalClicks] = useState();
    const [clickDates, setClickDates] = useState();
    const [error, setError] = useState("");
    const [dateCreated, setDateCreated] = useState();
    const [originalUrl, setOriginalUrl] = useState();

    useEffect(() => {
        getAnalytics();
    }, []);

    const getAnalytics = async () => {
        try {
            const response = await fetch(`https://localhost:5000/analytics/${code}`);

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
            click => `${click._id.month}/${click._id.day}`
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

    const totalClicks = clickDates.reduce((sum, click) => sum + click.count, 0);

    const daysSinceCreation = Math.max(
        1,
        Math.ceil(
            (Date.now() - dateCreated) /
            (1000 * 60 * 60 * 24)
        )
    );

    const averageClicksPerDay = (totalClicks / daysSinceCreation).toFixed(1);

    return (
        <div>
            <h1> URL Analytics </h1>
            <div>
                <h2> Custom URL </h2>
                <p> {code} </p>
            </div>
            <div>
                <h2> Original URL </h2>
                <p> {originalUrl} </p>
            </div>
            <div>
                <h3> Total clicks</h3>
                <p> {totalClicks} </p>
            </div>
            <div>
                <h3> Unique Visitors</h3>
                <p> {uniqueVisitors}

                </p>
            </div>
            <div>
                <h2> Traffic Over Time</h2>
                <Line data={lineChartData} />
            </div>
            <p> Average daily clicks: </p>
            <p> Peak traffic day: </p>
        </div>
    )
}