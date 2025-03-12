export interface WeatherData {
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
    };
    weather: [{
        main: string;
        description: string;
        icon: string;
    }];
    wind: {
        speed: number;
    };
    name: string;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
        };
        weather: [{
            icon: string;
            description: string;
        }];
    }>;
}