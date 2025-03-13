import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";

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
  const API_KEY = "API KEY";

  const renderRightIcon = () => {
    if (isLoading) {
      return <TextInput.Icon icon="loading" />;
    }
    if (query) {
      return <TextInput.Icon icon="close" onPress={() => setQuery("")} />;
    }
    return null;
  };

  const renderSuggestions = () => {
    if (suggestions.length > 0 && !isLoading) {
      return (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) =>
              `${item.name}-${item.country}-${index}`
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  onCitySelect(item.name);
                  setQuery(item.name);
                  setSuggestions([]);
                }}
              >
                <Text style={styles.cityText}>
                  {item.name}, {item.state ? `${item.state}, ` : ""}
                  {item.country}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        console.log("Fetching cities for query:", query);
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
          );
          const data = await response.json();
          console.log("API Response:", data);

          const cityList = data.map((item: any) => ({
            name: item.name,
            country: item.country,
            state: item.state,
          }));
          console.log("Processed city list:", cityList);
          setSuggestions(cityList);
        } catch (error) {
          console.log("API Error:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("Query too short, clearing suggestions");
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a city"
        style={styles.input}
        left={<TextInput.Icon icon="magnify" />}
        right={renderRightIcon()}
      />
      {renderSuggestions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 999,
    elevation: 999,
  },
  input: {
    marginBottom: 4,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  suggestionsList: {
    backgroundColor: "white",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
  },
  cityText: {
    fontSize: 16,
  },
});

export default CitySearchInput;
