import { StyleSheet, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import WeatherCard from "@/src/components/WeatherCard";
import ForecastList from "@/src/components/ForecastList";
import { IconButton } from "react-native-paper";
import { useWeather } from "@/src/store/WeatherContext";
import { useThemeToggle } from "@/src/store/ThemeContext";
import CitySearchInput from "@/src/components/CitySearchInput";

export default function HomeScreen() {
  const { fetchWeather } = useWeather();
  const { toggleTheme, isDarkMode } = useThemeToggle();

  const handleCitySelect = (city: string) => {
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <>
          <Image
            source={require("@/assets/images/weather-image-background.jpg")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <IconButton
            icon={isDarkMode ? "weather-night" : "weather-sunny"}
            onPress={toggleTheme}
            style={styles.themeToggle}
            size={24}
            iconColor="#ffffff"
          />
        </>
      }
    >
      <ThemedView style={styles.container}>
        <CitySearchInput onCitySelect={handleCitySelect} />
        <WeatherCard />
        <ForecastList />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  headerImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  themeToggle: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    zIndex: 1,
  },
});
