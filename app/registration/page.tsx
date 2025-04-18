"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";  

const UserRegistration: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');  
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // State to disable the button

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Disable the button while processing
    setIsButtonDisabled(true);

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
        setError("Registration successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setIsButtonDisabled(false); // Re-enable the button
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        // Handle errors from the backend
        const data = await response.json();
        setError(data.error || "Registration failed.");
        setIsButtonDisabled(true); // Keep the button disabled
      }
    } catch (error) {
      // Handle network or other errors
      setError("An error occurred. Please try again.");
      setIsButtonDisabled(true); // Keep the button disabled
    }
  };

  // Reset the button state when the user modifies any input
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setIsButtonDisabled(false); // Re-enable the button when the user modifies input
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Welcome to the team!</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleInputChange(setUsername)}
        required
        style={{ color: "purple", width: '100%', padding: '0.5rem' }}
      />
      <br/>

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handleInputChange(setPassword)}
        required
        style={{ color: "purple", width: '100%', padding: '0.5rem' }}
      />
      <br/>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleInputChange(setEmail)}
        required
        style={{ color: "purple", width: '100%', padding: '0.5rem' }}
      />
      <br/>

      <button
        type="submit"
        className="mt-6 inline-block text-blue-600 hover:underline"
        disabled={isButtonDisabled} // Disable the button based on state
      >
        Register
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UserRegistration;