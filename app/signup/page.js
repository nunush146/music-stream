"use client";
import { useState } from "react";
import { FaMusic, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      errorModal.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-gray-600">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h3 class="text-white text-lg font-bold mb-2">Password Mismatch</h3>
            <p class="text-gray-400 mb-4">Passwords do not match. Please try again.</p>
            <button class="px-6 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition" onclick="this.closest('.fixed').remove()">
              OK
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      return;
    }

    setIsLoading(true);
    
    // Create custom success modal instead of alert
    setTimeout(() => {
      setIsLoading(false);
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-gray-600">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-white text-lg font-bold mb-2">Account Created!</h3>
            <p class="text-gray-400 mb-4">Welcome to MusicStream, ${name}!</p>
            <button class="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition" onclick="this.closest('.fixed').remove()">
              Get Started
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }, 1000);
    // Later: call backend API
  };

  return (
    <>
      {/* Custom CSS for consistent dark theme */}
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
            <p className="text-gray-400 text-lg">Create your account</p>
          </div>

          {/* Signup Form */}
          <div className="bg-black p-8 rounded-lg shadow-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              Join MusicStream 🎧
            </h2>

            <form onSubmit={handleSignup} className="space-y-6">
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

              {/* Confirm Password Input */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-all text-base placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="text-sm text-gray-400">
                <p className="mb-1">Password must contain:</p>
                <ul className="space-y-1 ml-4">
                  <li className={`${password.length >= 8 ? 'text-blue-400' : 'text-gray-500'}`}>
                    ✓ At least 8 characters
                  </li>
                  <li className={`${/[A-Z]/.test(password) ? 'text-blue-400' : 'text-gray-500'}`}>
                    ✓ One uppercase letter
                  </li>
                  <li className={`${/[0-9]/.test(password) ? 'text-blue-400' : 'text-gray-500'}`}>
                    ✓ One number
                  </li>
                </ul>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:text-blue-300 hover:underline transition">
                Sign in
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