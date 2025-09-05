"use client";

import React, { useState } from 'react';
import { register } from '@/services/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('UNDEFINED');
  const [type, setType] = useState('LISTENER');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userData: Record<string, unknown> = { name, email, password, gender, type };

      if (bio) {
        userData.bio = bio;
      }
      if (profileImageUrl) {
        userData.profileImageUrl = profileImageUrl;
      }

      const data = await register(userData);
      if (data.error) {
        let errorMessage = 'Registration failed:';
        if (typeof data.error === 'object' && data.error.fieldErrors) {
          for (const key in data.error.fieldErrors) {
            if (data.error.fieldErrors.hasOwnProperty(key)) {
              errorMessage += `\n- ${key}: ${data.error.fieldErrors[key].join(', ')}`;
            }
          }
        } else if (typeof data.error === 'string') {
          errorMessage = data.error;
        } else if (Array.isArray(data.error)) {
          errorMessage = data.error.join(', ');
        } else {
          errorMessage += `\n${JSON.stringify(data.error)}`;
        }
        setError(errorMessage);
      } else {
        alert('Registration successful! Please log in.');
        router.push('/login');
      }
    } catch {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[--background]">
      <div className="bg-[--panel] p-8 rounded-2xl shadow-lg w-96 border border-[--panel-border]">
        <h1 className="text-2xl font-semibold mb-4 text-white">Sign Up</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full bg-transparent border border-gray-700 text-white placeholder-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full bg-transparent border border-gray-700 text-white placeholder-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full bg-transparent border border-gray-700 text-white placeholder-gray-400 rounded-md py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-300 text-sm font-medium mb-2">Gender</label>
            <div className="relative">
              <select
                id="gender"
                className="w-full bg-[--panel] border border-gray-700 text-white rounded-md py-2 px-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="UNDEFINED">Undefined</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-300 text-sm font-medium mb-2">Type</label>
            <div className="relative">
              <select
                id="type"
                className="w-full bg-[--panel] border border-gray-700 text-white rounded-md py-2 px-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-accent"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="LISTENER">Listener</option>
                <option value="ARTIST">Artist</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
            <textarea
              id="bio"
              className="w-full bg-transparent border border-gray-700 text-white placeholder-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="profileImageUrl" className="block text-gray-300 text-sm font-medium mb-2">Profile Image URL</label>
            <input
              type="text"
              id="profileImageUrl"
              className="w-full bg-transparent border border-gray-700 text-white placeholder-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your profile image URL"
              value={profileImageUrl}
              onChange={(e) => setProfileImageUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-accent w-full text-sm"
            >
              Register
            </button>
            <Link href="/login" className="text-accent text-sm hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;