import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useWeather } from "../store/WeatherContext";
import { ForecastData } from "../utils/types";

const ForecastList = () => {
  const { forecast } = useWeather();
  const forecastData = forecast as ForecastData;

  if (!forecastData) return null;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>5-Day Forecast</Title>
        <View style={styles.line} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {forecastData.list.map((item) => (
            <View key={item.dt} style={styles.forecastItem}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                }}
                style={styles.icon}
              />
              <Paragraph>{Math.round(item.main.temp)}°C</Paragraph>
              <Paragraph>
                {new Date(item.dt * 1000).toLocaleDateString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Paragraph>
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "100%",
  },
  forecastItem: {
    alignItems: "center",
    marginRight: 16,
    padding: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default ForecastList;
