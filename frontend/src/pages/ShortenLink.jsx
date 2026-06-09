import { useState } from "react"

export default function ShortenLink() {
    const [originalUrl, setOriginalUrl] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [error, setError] = useState("");

    const shorten = async () => {
        try {
            const response = await fetch("https://localhost:5000/shortenUrl", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: {
                    originalUrl,
                    customUrl,
                }
            });

            if (response.ok) {
                // Do something
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
                onChange={(text) => setOriginalUrl(text)}
                placeholder="Enter original URL"
            />

            <input
                type="text"
                value={customUrl}
                onChange={(text) => setCustomUrl(text)}
                placeholder="Enter custom customUrl for URL"
            />

            <button onClick={shorten}>
                Create Custom URL
            </button>
        </div>
    )
}