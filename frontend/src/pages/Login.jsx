import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/login", {
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
                // set JWT token
                const data = await response.json();
                localStorage.setItem('token', data.token);
                // navigate to dashboard
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
            setError("Login failed");
        }
    }

    return (
        <div className={styles.loginContainer}>
            <h1> Custom URL Shortener </h1>
            <p> Log in to your account</p>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>

            <div className={styles.buttonsContainer}>
                <button onClick={handleLogin} >
                    Login
                </button>

                <p> New here? Create a new account to get started </p>
                <Link className={`${styles.button} ${styles.registerButton}`} to="/register">
                    Register
                </Link>
            </div>
        </div>
    )
}