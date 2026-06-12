import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import UrlCard from "../components/UrlCard";

export default function Dashboard() {
    const [myUrls, setMyUrls] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            getUrls();
        }
    }, [token]);

    // Get user links and display them
    const getUrls = async () => {
        try {

            const response = await fetch("http://localhost:5000/url/my-urls", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMyUrls(data);
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
            {myUrls.length === 0 ? (
                <div>
                    No URLs found
                </div>
            ) : (
                myUrls.map((u) => (
                    <UrlCard
                        key={u._id}
                        url={u}
                    />
                )))}
        </div>
    )
}