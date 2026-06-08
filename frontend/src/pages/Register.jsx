

export default function Register() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = async () => {
        try {
            const response = await fetch("https://localhost:5000/register", {
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
                // Navigate to login page
            }


        } catch (err) {
            console.log(err);
            setError("Failed to register");
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

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    )
}