export const fetchWeather = async (city: string, unit: 'metric' | 'imperial') => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    if (!res.ok) throw new Error('Failed to fetch weather');
    return res.json();
  };
  