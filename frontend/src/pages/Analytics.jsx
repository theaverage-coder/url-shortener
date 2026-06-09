import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Analytics() {
    const { shortCode } = useParams();
    const [uniqueVisitors, setUniqueVisitors] = useState();
    const [totalClicks, setTotalClicks] = useState();
    const [clickDates, setClickDates] = useState();
    const [error, setError] = useState("");

    const getAnalytics = async () => {
        try {
            const resposne = await fetch(`https://localhost:5000/analytics/${shortCode}`);

            if (response.ok) {
                const data = await response.json();
                setUniqueVisitors(data.uniqueVisitors);
                setTotalClicks(data.totalClicks);
                setClickDates(data.analytics);
            }
        } catch (err) {
            console.log(err);
            setError("Failed to retrieve analytics");
        }
    }
    return (
        <>
        </>
    )
}