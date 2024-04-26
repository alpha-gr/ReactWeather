import { fetchWeatherApi } from 'openmeteo';
const forecast_days = 7;

// Helper function to form time ranges
range = (start, stop, step) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export function getWeatherData(city) {

    return new Promise((resolve, reject) => {
        const params = {
			"latitude": city.latitude,
			"longitude": city.longitude,
			"current": ["temperature_2m", "is_day", "weather_code"],
            "hourly": ["temperature_2m", "precipitation_probability", "precipitation", "weather_code"],
	        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"],
			"timezone": "auto",
			"forecast_days": forecast_days
		};
        const url = "https://api.open-meteo.com/v1/forecast";
        let data = fetchWeatherApi(url, params)

    	data.then(responses => {
                // Process first location. Add a for-loop for multiple locations or weather models
                const response = responses[0];

                // Attributes for timezone and location
                const utcOffsetSeconds = response.utcOffsetSeconds();
                const timezone = response.timezone();
                const timezoneAbbreviation = response.timezoneAbbreviation();
                const latitude = response.latitude();
                const longitude = response.longitude();

                const current = response.current();
                const hourly = response.hourly();
                const daily = response.daily();

                // Note: The order of weather variables in the URL query and the indices below need to match!
                const weatherData = {
                    current: {
                        time: new Date((Number(current.time())) * 1000),
                        temperature2m: current.variables(0).value(),
                        isDay: current.variables(1).value(),
                        weatherCode: current.variables(2).value(),
                    },
                    hourly: {
                        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                            (t) => new Date((t) * 1000)
                        ),
                        temperature2m: hourly.variables(0).valuesArray(),
                        precipitationProbability: hourly.variables(1).valuesArray(),
                        precipitation: hourly.variables(2).valuesArray(),
                        weatherCode: hourly.variables(3).valuesArray(),
                    },
                    daily: {
                        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                            (t) => new Date((t) * 1000)
                        ),
                        weatherCode: daily.variables(0).valuesArray(),
                        temperature2mMax: daily.variables(1).valuesArray(),
                        temperature2mMin: daily.variables(2).valuesArray(),
                    },
                    dailyDataArray: [],
                    hourlyDataArray: [],
                };
                // `weatherData` now contains a simple structure with arrays for datetime and weather data

                // put the daily weather data in an array
                let dailyDataArray = [];
                for (let i = 0; i < forecast_days; i++) {
                    dailyDataArray.push({
                        time: weatherData.daily.time[i],
                        weatherCode: weatherData.daily.weatherCode[i],
                        temperature2mMax: weatherData.daily.temperature2mMax[i],
                        temperature2mMin: weatherData.daily.temperature2mMin[i],
                    });
                }
                weatherData.dailyDataArray = dailyDataArray;

                // put the hourly weather data in an array, each day contains the hourly data for that day
                 let hourlyDataArray = [];
                for (let i = 0; i < forecast_days; i++) {
                    let hourlyData = [];
                    for (let j = 0; j < 24; j++) {
                        hourlyData.push({
                            time: weatherData.hourly.time[i * 24 + j],
                            temperature2m: weatherData.hourly.temperature2m[i * 24 + j],
                            precipitationProbability: weatherData.hourly.precipitationProbability[i * 24 + j],
                            precipitation: weatherData.hourly.precipitation[i * 24 + j],
                            weatherCode: weatherData.hourly.weatherCode[i * 24 + j],
                        });
                    }
                    hourlyDataArray.push(hourlyData);
                }
                weatherData.hourlyDataArray = hourlyDataArray;

				//log the weather data
                console.log("weather.js: weather data fetched")
				console.log(weatherData);

                resolve(weatherData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

