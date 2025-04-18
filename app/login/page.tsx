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
  const [failedLogin, setFailedLogin] = useState<number>(0); // Track failed login attempts
  const [disable, setDisable] = useState<boolean>(false); // Manage disable state
  const maxFailedLogin = 3;

  // Set is client to true when the component is mounted to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isClient) return;

    // Disable login attempts if the disable flag is triggered
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
        // Increment failed login attempts
        setFailedLogin(prev => {
          const newFailedLogin = prev + 1;
          if (newFailedLogin >= maxFailedLogin) {
            setDisable(true); // Disable further login attempts
            setTimeout(() => {
              setDisable(false); // Re-enable after 5 minutes
            }, 1000 * 60 * 5);
          }
          return newFailedLogin;
        });
      }
    } catch (error) {
      setError('Failed to connect to server. Please try again later.');
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
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ color: "purple", width: '100%', padding: '0.5rem' }}
            disabled={disable} // Disable input if login is disabled
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
            disabled={disable} // Disable input if login is disabled
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          className="mt-6 inline-block text-blue-600 hover:underline"
          disabled={disable} // Disable button if login is disabled
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
