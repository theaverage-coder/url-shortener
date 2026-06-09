// Root component of app

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ShortenLink from "./pages/ShortenLink";
import Register from "./pages/Register";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics/:shortCode" element={<Analytics />} />
            <Route path="/shorten" element={<ShortenLink />} />
        </Routes>
    )
}