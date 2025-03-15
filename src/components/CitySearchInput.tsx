import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  LayoutChangeEvent, // Import this type
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useThemeToggle } from "@/src/store/ThemeContext";
import { ThemedText } from "@/components/ThemedText";

interface City {
  name: string;
  country: string;
  state?: string;
}

interface CitySearchInputProps {
  onCitySelect: (city: string) => void;
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const API_KEY = '';
  const { isDarkMode, theme } = useThemeToggle();

  const renderRightIcon = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" color={theme.colors.primary} />;
    }
    if (query) {
      return (
        <TextInput.Icon
          icon="close"
          onPress={() => {
            setQuery("");
            setSuggestions([]);
            setNoResults(false);
          }}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        setNoResults(false);

        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
              query
            )}&limit=5&appid=${API_KEY}`
          );

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
            const cityList = data.map((item) => ({
              name: item.name,
              country: item.country,
              state: item.state || "",
            }));

            setSuggestions(cityList);
            setNoResults(false);
          } else {
            setSuggestions([]);
            setNoResults(true);
          }
        } catch (error) {
          console.error("API Error:", error);
          setSuggestions([]);
          setNoResults(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setNoResults(false);
      }
    };

    const timeoutId = setTimeout(fetchCities, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Add proper type annotation for the event parameter
  const onInputLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setInputHeight(height);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Weather App (*creative name*)
      </ThemedText>

      <View style={styles.inputContainer} onLayout={onInputLayout}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for a city"
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? theme.colors.surface : "white",
            },
          ]}
          placeholderTextColor={
            isDarkMode ? theme.colors.onSurfaceVariant : undefined
          }
          textColor={isDarkMode ? theme.colors.onSurface : undefined}
          left={<TextInput.Icon icon="magnify" />}
          right={renderRightIcon()}
          theme={theme}
        />
      </View>

      {(suggestions.length > 0 || noResults) && (
        <View
          style={[
            styles.suggestionsContainer,
            {
              backgroundColor: isDarkMode ? theme.colors.surface : "white",
              borderColor: isDarkMode ? theme.colors.outline : "#eee",
              top: inputHeight + 110, // Position below the input (title + input height)
            },
          ]}
        >
          {noResults ? (
            <View style={styles.noResultsContainer}>
              <Text
                style={[
                  styles.noResultsText,
                  {
                    color: isDarkMode ? theme.colors.onSurfaceVariant : "#666",
                  },
                ]}
              >
                No cities found matching "{query}"
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.scrollView}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {suggestions.map((item, index) => (
                <TouchableOpacity
                  key={`${item.name}-${item.country}-${index}`}
                  style={[
                    styles.suggestionItem,
                    {
                      borderBottomColor: isDarkMode
                        ? theme.colors.outline
                        : "#eee",
                      borderBottomWidth: index < suggestions.length - 1 ? 1 : 0,
                    },
                  ]}
                  onPress={() => {
                    onCitySelect(item.name);
                    setQuery(item.name);
                    setSuggestions([]);
                  }}
                >
                  <Text
                    style={[
                      styles.cityText,
                      {
                        color: isDarkMode ? theme.colors.onSurface : undefined,
                      },
                    ]}
                  >
                    {item.name}, {item.state ? `${item.state}, ` : ""}
                    {item.country}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000,
    marginBottom: 10,
  },
  title: {
    paddingBottom: 20,
    fontSize: 35,
    fontStyle: "italic",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 4,
  },
  suggestionsContainer: {
    position: "absolute",
    marginTop: -60,
    left: 0,
    right: 0,
    borderRadius: 4,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 200,
    borderWidth: 1,
  },
  scrollView: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
  },
  cityText: {
    fontSize: 16,
  },
  noResultsContainer: {
    padding: 16,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
  },
});

export default CitySearchInput;
