"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";  

const Dashboard: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchWeatherData = async (query: string) => {
        try {
          const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=&q=${query}&days=4&aqi=no&alerts=no`); // Send query to backend
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          setWeatherData(data);
          setError(null); // Clear any previous errors
        } catch (err: any) {
          setError(err.message || "An error occurred while fetching weather data");
          setWeatherData(null); // Clear previous weather data on error
        }
      };

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      fetchWeatherData(searchQuery); // Fetch weather data for the entered query
    } else {
      setError("Please enter a location");
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Weather Dashboard</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 -mt-14">
        <input
          type="text"
          placeholder="Hows the weather?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-64"
          style={{ color: "purple" }} 
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Weather Data */}
      {weatherData ? (
        <div className="weather-info">
          <h2 className="text-xl font-semibold">Current Weather</h2>
          <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
          <p><strong>Condition:</strong> {weatherData.condition}</p>
          <p><strong>Location:</strong> {weatherData.location}</p>
        </div>
      ) : (
        !error && <p>Enter a location to see the weather data.</p>
      )}
    </main>
  );
};
    export default Dashboard;