import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { useWeather } from "../store/WeatherContext";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

const WeatherScreen = () => {
  const [cityInput, setCityInput] = useState("");
  const { loading, fetchWeather } = useWeather();

  const handleSearch = () => {
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={cityInput}
        onChangeText={setCityInput}
        placeholder="Enter city name"
        onSubmitEditing={handleSearch}
        style={styles.input}
      />

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
  input: {
    marginBottom: 16,
  },
});

export default WeatherScreen;
