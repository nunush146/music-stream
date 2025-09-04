"use client";
import { useState } from "react";
import { FaMusic, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send login request to backend
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        // Show error modal
        const errModal = document.createElement("div");
        errModal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
        errModal.innerHTML = `
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-gray-600">
            <div class="text-center">
              <h3 class="text-white text-lg font-bold mb-2">Login Failed</h3>
              <p class="text-gray-400 mb-4">${data.message || "Unable to login."}</p>
              <button class="px-6 py-2 bg-red-500 text-white rounded-lg" onclick="this.closest('.fixed').remove()">OK</button>
            </div>
          </div>
        `;
        document.body.appendChild(errModal);
        return;
      }

      // Success modal
      const successModal = document.createElement("div");
      successModal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      successModal.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-gray-600">
          <div class="text-center">
            <h3 class="text-white text-lg font-bold mb-2">Welcome Back!</h3>
            <p class="text-gray-400 mb-4">Login successful for ${name}</p>
            <button class="px-6 py-2 bg-blue-500 text-white rounded-lg" onclick="this.closest('.fixed').remove()">Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(successModal);

      console.log("Login success:", data);

    } catch (err) {
      setIsLoading(false);
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #121212;
          color: #ffffff;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <FaMusic className="text-black text-lg" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                MusicStream
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-black p-8 rounded-lg shadow-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              Welcome Back 🎶
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-all text-base placeholder-gray-400"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-all text-base placeholder-gray-400"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-all text-base placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-400 hover:text-blue-300 hover:underline transition">
                Sign up
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>© 2024 MusicStream. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
