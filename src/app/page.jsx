"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is valid
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Clear error if email is valid
    setError('');

    // Implement your authentication logic here (mock or real)
    login(); // Call the login function from context
    router.push('/dashboard'); // Redirect to the home page after login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Login to Pokimon</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80 max-w-lg">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 p-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-gray-400 outline-none w-full"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 p-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-gray-400 outline-none w-full"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg transition duration-300 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>

    </div>
  );
};
