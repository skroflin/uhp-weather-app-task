import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { weatherApi } from "../services/weatherApi";

interface WeatherContextType {
  currentWeather: any;
  forecast: any;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  lastSearchedCity: string;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState("");

  useEffect(() => {
    loadLastSearchedCity();
  }, []);

  const loadLastSearchedCity = async () => {
    try {
      const city = await AsyncStorage.getItem("lastCity");
      if (city) {
        setLastSearchedCity(city);
        fetchWeather(city);
      }
    } catch (error) {
      console.error("Error loading last city:", error);
    }
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city),
      ]);
      setCurrentWeather(weather);
      setForecast(forecastData);
      await AsyncStorage.setItem("lastCity", city);
      setLastSearchedCity(city);
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      currentWeather,
      forecast,
      loading,
      error,
      fetchWeather,
      lastSearchedCity,
    }),
    [currentWeather, forecast, loading, error, lastSearchedCity]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (undefined === context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
