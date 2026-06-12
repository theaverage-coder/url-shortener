// Root component of app

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import ShortenLink from "./pages/ShortenLink.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics/:shortCode" element={<Analytics />} />
        <Route path="/shorten" element={<ShortenLink />} />
      </Routes>
    </BrowserRouter>
  )
}