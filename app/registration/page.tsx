"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";  

const router=useRouter(); // Initialize the router
const UserRegistration: React.FC = () => {
const [username, setUsername] = useState<string>('');
const [password, setPassword] = useState<string>('');  
const [email, setEmail] = useState<string>('');
const [message, setMessage] = useState<string>(''); 

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send a POST request to the backend
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Handle success
        setMessage("Registration successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        // Handle errors from the backend
        const data = await response.json();
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      // Handle network or other errors
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Welcome to the team!</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <br/>

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <br/>
<label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <br/>
      <button type="submit" className="mt-6 inline-block text-blue-600 hover:underline">Register</button>
    </form>
  );
};

export default UserRegistration;