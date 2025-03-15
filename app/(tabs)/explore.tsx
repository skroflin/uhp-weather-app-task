import { StyleSheet } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { IconButton } from "react-native-paper";
import { useThemeToggle } from "@/src/store/ThemeContext";

export default function TabTwoScreen() {
  const { toggleTheme, isDarkMode } = useThemeToggle();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <>
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About This App</ThemedText>
      </ThemedView>

      <ThemedText>
        This weather app was built using React Native, Expo platform, Expo
        Router and the OpenWeatherMap API.
      </ThemedText>

      <Collapsible title="Technologies Used">
        <ThemedText>
          This app is built with the following technologies:
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">React Native</ThemedText> - A
          framework for building native apps using React
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo</ThemedText> - A platform for
          making universal React applications
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Expo Router</ThemedText> -
          File-based routing for Expo apps
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">React Native Paper</ThemedText> -
          Material Design components for React Native
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">OpenWeatherMap API</ThemedText> -
          Weather data provider
        </ThemedText>
        <ExternalLink href="https://openweathermap.org/api">
          <ThemedText type="link">
            Learn more about OpenWeatherMap API
          </ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="App Features">
        <ThemedText>
          This weather app provides the following features:
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">City Search</ThemedText> - Search
          for any city worldwide
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Current Weather</ThemedText> - View
          current temperature, conditions, and other weather details
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Weather Forecast</ThemedText> - See
          the weather forecast for upcoming days
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Dark/Light Mode</ThemedText> -
          Toggle between dark and light themes
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Responsive Design</ThemedText> -
          Works on Android, iOS, and web platforms
        </ThemedText>
      </Collapsible>

      <Collapsible title="How to Use">
        <ThemedText>Using this app is simple:</ThemedText>
        <ThemedText>1. Enter a city name in the search bar</ThemedText>
        <ThemedText>
          2. Select a city from the suggestions that appear
        </ThemedText>
        <ThemedText>
          3. View the current weather and forecast for your selected city
        </ThemedText>
        <ThemedText>
          4. Toggle between dark and light mode using the button in the
          top-right corner
        </ThemedText>
      </Collapsible>

      <Collapsible title="Weather Data">
        <ThemedText>
          This app uses the OpenWeatherMap API to fetch weather data. The data
          includes:
        </ThemedText>
        <ThemedText>Current temperature (in Celsius)</ThemedText>
        <ThemedText>Weather conditions (sunny, cloudy, rainy, etc.)</ThemedText>
        <ThemedText>Humidity levels</ThemedText>
        <ThemedText>Wind speed and direction</ThemedText>
        <ThemedText>Atmospheric pressure</ThemedText>
        <ThemedText>Sunrise and sunset times</ThemedText>
        <ThemedText>5-day weather forecast</ThemedText>
        <ExternalLink href="https://openweathermap.org/api">
          <ThemedText type="link">Learn more about the weather data</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Technical Implementation">
        <ThemedText>
          The app is structured using Expo Router's file-based routing system.
          It uses React contexts for state management, including weather data
          and theme preferences. The UI is built with React Native Paper
          components and custom themed components to ensure consistent styling
          across the app.
        </ThemedText>
        <ThemedText>
          The city search feature uses the OpenWeatherMap Geocoding API to
          convert city names to geographic coordinates, which are then used to
          fetch weather data for the selected location.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Theme Toggle">
        <ThemedText>
          This app supports both light and dark themes. You can toggle between
          them by pressing the sun/moon icon in the top-right corner of the
          screen. The theme preference is managed using React's Context API,
          allowing the theme to be consistent across all screens.
        </ThemedText>
        <ThemedView style={styles.themeToggleDemo}>
          <ThemedText>
            Current theme: {isDarkMode ? "Dark" : "Light"}
          </ThemedText>
          <IconButton
            icon={isDarkMode ? "weather-night" : "weather-sunny"}
            onPress={toggleTheme}
            size={24}
            style={styles.demoButton}
          />
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  themeToggle: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    zIndex: 1,
  },
  themeToggleDemo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  demoButton: {
    margin: 0,
  },
});
