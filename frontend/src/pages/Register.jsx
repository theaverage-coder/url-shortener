import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css';

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if (response.ok) {
                // Navigate to login page
                navigate("/");
            }


        } catch (err) {
            console.log(err);
            setError("Failed to register");
        }
    }
    return (
        <div className={styles.registerContainer}>
            <h1> Custom URL Shortener </h1>
            <p> Create a new account</p>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />

                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <button onClick={handleRegister} className={`${styles.button} ${styles.registerButton}`}>
                Register
            </button>
        </div>
    )
}