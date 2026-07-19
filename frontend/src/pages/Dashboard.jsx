import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import UrlCard from "../components/UrlCard";
import styles from "./Dashboard.module.css";
import { IoAddSharp } from "react-icons/io5";
import Modal from "../components/Modal";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [myUrls, setMyUrls] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const [originalUrl, setOriginalUrl] = useState("");
    const [customUrl, setCustomUrl] = useState("");

    useEffect(() => {
        if (token) {
            getUrls();
        }
    }, [token]);

    // Get user links and display them
    const getUrls = async () => {
        console.log("here");
        try {

            const response = await fetch("http://localhost:5000/url/my-urls", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setMyUrls(data);
            } else {
                console.log("Failed");
            }
        } catch (err) {
            console.log(err);
            setError("Failed to retrieve URLs");
        }
    };

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
            <h1> My URLs</h1>
            <button className={styles.addURLContainer} onClick={() => setOpen(true)}>
                <IoAddSharp />
                Add new URL
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className={styles.modalContent}>
                    <h4> Create a new custom code for a URL </h4>
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
                        placeholder="Enter custom code for URL"
                    />

                    <button onClick={shorten}>
                        Create Custom URL
                    </button>
                </div>
            </Modal>
            {myUrls.length === 0 ? (
                <div>
                    No URLs found
                </div>
            ) : (
                <div className={styles.cardsContainer}>
                    {myUrls.map((u) => (
                        <UrlCard
                            key={u.id}
                            url={u}
                        />

                    ))}
                </div>
            )}
        </div>
    )
}