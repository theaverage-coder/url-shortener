import { useState } from "react";


export default function Login() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("https://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: {
                    username,
                    password
                }
            });

            if (response.ok) {
                // Navigate to dashboard
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
        </div>
    )
}