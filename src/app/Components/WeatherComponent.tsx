// src/components/WeatherComponent.tsx
'use client';

import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

interface WeatherData {
  hourly: any,
  daily: any;
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  sunrise: string;
  sunset: string;
}

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        latitude: 52.5244,
        longitude: 13.4105,
        daily: ["sunrise", "sunset"],
        hourly: [
          "temperature_2m", "relative_humidity_2m", "rain", "snowfall", "showers",
          "wind_speed_10m","wind_speed_80m","wind_speed_120m","wind_speed_180m",
          "wind_direction_10m","wind_direction_80m","wind_direction_120m","wind_direction_180m"
        ],
        timezone: "Europe/Berlin",
        past_days: 3,
      };
      const url = "https://api.open-meteo.com/v1/forecast";

      try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const timezone = response.timezone();

        const hourly = response.hourly()!;
        const daily = response.daily()!;

        const sunrise = daily.variables(0)!;
        const sunset = daily.variables(1)!;

        const weather: WeatherData = {
          hourly,
          daily,
          latitude,
          longitude,
          elevation,
          timezone,
          sunrise,
          sunset,
        };

        setWeatherData(weather);
      } catch (error) {
        console.error("Weather fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (!weatherData) return <p>No weather data</p>;

  return (
    <div>
      <h2>Weather Info</h2>
      <p>Latitude: {weatherData.latitude}</p>
      <p>Longitude: {weatherData.longitude}</p>
      <p>Elevation: {weatherData.elevation}</p>
      <p>Timezone: {weatherData.timezone}</p>

      {/* You can add more detailed hourly/daily rendering here */}
    </div>
  );
};

export default WeatherComponent;
