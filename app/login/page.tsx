"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

/**
 * Login page component
 * 
 * The component is a simple login form that sends a POST request to the server
 * with the username and password. If the request is successful, the user is
 * redirected to the home page. Otherwise, an error message is displayed.
 * 
 */
const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  let failedLogin = 0;
  const maxFailedLogin = 3;
  let disable = false;

  // Set is client to true when the component is mounted to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isClient) return;
    //dissables login attempts if disable has been triggered
    if (disable) {
      setError('Too many failed login attempts. Please try again later.');
      return;
    }

    // Send POST request to the server
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        console.log('Login successful');
        router.push('/dashboard'); // Redirect to the dashboard page
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong');
        //this makes a disable button after 3 failed logins
        failedLogin++;
        if (failedLogin >= maxFailedLogin) {
          setTimeout(() => {
            disable = true;
      }, 1000 * 60 * 5); // Disable for 5 minutes
        }
      } //end try block
    } catch (error) {
      setError('Failed to connect to server.' + error);
    }
  };


  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            id="username"
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ color: "purple", width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ color: "purple", width: '100%', padding: '0.5rem' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="mt-6 inline-block text-blue-600 hover:underline">Login</button>
      </form>
    </div>
  );
};

export default Login;
