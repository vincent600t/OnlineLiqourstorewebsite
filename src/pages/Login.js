import React, { useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isAdult) {
      setError("You must confirm you are 18 years and above.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <img src="/logo192.png" alt="logo" className="h-14 w-14 object-contain" />
          <div className="text-xl font-semibold">BLACK &amp; WHITE</div>
        </div>
        <nav className="space-x-6 text-lg">
          <a href="/login" className="hover:underline">Login</a>
          <a href="/register" className="hover:underline">Register</a>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <h1 className="text-5xl font-bold text-center mb-2">Login</h1>
          <p className="text-center text-lg text-gray-700 mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg space-y-5">
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="adult"
                type="checkbox"
                checked={isAdult}
                onChange={() => setIsAdult(!isAdult)}
                className="h-4 w-4 mr-3"
              />
              <label htmlFor="adult" className="text-base">I agree I am 18yrs and above</label>
            </div>

            {error && <div className="text-center text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-lg font-medium disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6">
            Don’t have an account? <a href="/register" className="text-red-600 underline">Register</a>
          </p>
        </div>
      </main>
    </div>
  );
}