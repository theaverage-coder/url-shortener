import { useState } from "react"


export default function Dashboard() {
    const [myUrls, setMyUrls] = useState([]);
    const [error, setError] = useState("");

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
                setMyUrls(data);
            }

        } catch (err) {
            console.log(err);
            setError("Failed to retrieve URLs");
        }
    };


    return (
        <div>

        </div>
    )
}