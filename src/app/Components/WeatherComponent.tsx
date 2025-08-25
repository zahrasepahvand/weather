// components/BerlinWeather.tsx
'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  windSpeed: number;
}

const BerlinWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m'
        );
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeather({
          temperature: data.current.temperature_2m,
          windSpeed: data.current.wind_speed_10m,
        });
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>No weather data available.</p>;

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px' }}>
      <h2>Berlin Weather</h2>
      <p><strong>Temperature:</strong> {weather.temperature} °C</p>
      <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
    </div>
  );
};

export default BerlinWeather;
