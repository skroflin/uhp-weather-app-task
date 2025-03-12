import axios from 'axios';

const API_KEY = 'API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
    getCurrentWeather: async (city: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getForecast: async (city: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};