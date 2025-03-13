import axios from 'axios';

const API_KEY = 'API KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
    getCurrentWeather: async (city: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to fetch weather data: ${error.response?.data.message || error.message}`);
            }
            throw new Error('An unexpected error occurred while fetching weather data');
        }
    },

    getForecast: async (city: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to fetch forecast data: ${error.response?.data.message || error.message}`);
            }
            throw new Error('An unexpected error occurred while fetching forecast data');
        }
    }
};