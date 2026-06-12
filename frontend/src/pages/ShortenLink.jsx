import { useState } from "react"

export default function ShortenLink() {
    const [originalUrl, setOriginalUrl] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    const shorten = async () => {
        try {
            const response = await fetch("http://localhost:5000/url/shortenUrl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    originalUrl,
                    customUrl,
                })
            });

            if (response.ok) {
                console.log("Custom code created!");
            } else {
                const errorJson = await response.json();
                console.log(errorJson.error);
            }
        } catch (err) {
            console.log(err);
            setError("Failed to create custom link");
        }
    }

    return (
        <div>
            <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter original URL"
            />

            <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Enter custom customUrl for URL"
            />

            <button onClick={shorten}>
                Create Custom URL
            </button>
        </div>
    )
}