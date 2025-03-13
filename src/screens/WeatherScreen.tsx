import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useWeather } from "../store/WeatherContext";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import CitySearchInput from "../components/CitySearchInput";

const WeatherScreen = () => {
  const { loading, fetchWeather } = useWeather();

  const handleCitySelect = (city: string) => {
    fetchWeather(city);
  };

  return (
    <ScrollView style={styles.container}>
      <CitySearchInput onCitySelect={handleCitySelect} />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <WeatherCard />
          <ForecastList />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default WeatherScreen;
