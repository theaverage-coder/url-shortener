import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("https://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    username,
                    password
                }
            });

            if (response.ok) {
                // set JWT token
                const data = await response.json();
                localStorage.setItem(data.token);
                // navigate to dashboard
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
            setError("Login failed");
        }
    }

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(text) => setUsername(text)}
                placeholder="Username"
            />

            <input
                type="text"
                value={password}
                onChange={(text) => setPassword(text)}
                placeholder="Password"
            />

            <button onClick={handleLogin} >
                Login
            </button>

            <Link to="/register">
                Register
            </Link>
        </div>
    )
}