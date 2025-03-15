import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useWeather } from "../store/WeatherContext";
import { WeatherData } from "../utils/types";

const WeatherCard = () => {
  const { currentWeather } = useWeather();
  const weather = currentWeather as WeatherData;

  if (!weather) return null;

  const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{weather.name}</Title>
        <View style={styles.mainInfo}>
          <Image source={{ uri: iconUrl }} style={styles.icon} />
          <Title>{Math.round(weather.main.temp)}°C</Title>
        </View>
        <Paragraph style={styles.description}>
          {weather.weather[0].description}
        </Paragraph>
        <View style={styles.details}>
          <Paragraph>Humidity: {weather.main.humidity}%</Paragraph>
          <Paragraph>Wind: {weather.wind.speed} m/s</Paragraph>
          <Paragraph>
            Feels like:
            {Math.round(weather.main.feels_like)}°C
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    width: 50,
    height: 50,
  },
  description: {
    fontStyle: "italic",
  },
  details: {
    marginTop: 8,
  },
});

export default WeatherCard;
