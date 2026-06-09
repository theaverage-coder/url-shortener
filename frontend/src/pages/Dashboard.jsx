import { useState } from "react"
import { Link } from "react-router-dom";
import UrlCard from "../components/UrlCard";

export default function Dashboard() {
    const [myUrls, setMyUrls] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    // Get user links and display them
    const getUrls = async () => {
        try {
            const response = await fetch("https://localhost:5000/my-urls", {
                method: "GET",
                header: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = response.json();
                setMyUrls(data.urls);
            }

        } catch (err) {
            console.log(err);
            setError("Failed to retrieve URLs");
        }
    };


    return (
        <div>
            <Link to="/shorten">
                Create new custom URL
            </Link>
            <div> My URLs</div>
            {urls.length === 0 ? (
                <div>
                    No URLs found
                </div>
            ) : (
                urls.map((u) => (
                    <UrlCard
                        key={u._id}
                        url={u}
                    />
                )))}
        </div>
    )
}