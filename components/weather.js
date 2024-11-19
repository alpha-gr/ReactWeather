import { fetchWeatherApi } from 'openmeteo';
import { compareHoursTimezone, isToday } from './scripts/timeHelper';

const forecast_days = 7;

// Helper function to form time ranges
const range = (start, stop, step) => 
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export async function getWeatherData(city, calendar) {
    const timezone = calendar["timeZone"];
    const params = {
        latitude: city.latitude,
        longitude: city.longitude,
        current: ["temperature_2m", "is_day", "weather_code"],
        hourly: ["temperature_2m", "precipitation_probability", "precipitation", "weather_code", "is_day"],
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
        timezone: "auto",
        forecast_days
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const weatherData = {
            current: {
                time: new Date(Number(response.current().time()) * 1000),
                temperature2m: response.current().variables(0).value(),
                isDay: response.current().variables(1).value(),
                weatherCode: response.current().variables(2).value(),
            },
            hourly: {
                time: range(Number(response.hourly().time()), Number(response.hourly().timeEnd()), response.hourly().interval()).map(
                    (t) => new Date(t * 1000)
                ),
                temperature2m: response.hourly().variables(0).valuesArray(),
                precipitationProbability: response.hourly().variables(1).valuesArray(),
                precipitation: response.hourly().variables(2).valuesArray(),
                weatherCode: response.hourly().variables(3).valuesArray(),
                isDay: response.hourly().variables(4).valuesArray(),
            },
            daily: {
                time: range(Number(response.daily().time()), Number(response.daily().timeEnd()), response.daily().interval()).map(
                    (t) => new Date(t * 1000)
                ),
                weatherCode: response.daily().variables(0).valuesArray(),
                temperature2mMax: response.daily().variables(1).valuesArray(),
                temperature2mMin: response.daily().variables(2).valuesArray(),
            },
            metadata: {
                utcOffsetSeconds: response.utcOffsetSeconds(),
                timezone: response.timezone(),
                timezoneAbbreviation: response.timezoneAbbreviation(),
                latitude: response.latitude(),
                longitude: response.longitude()
            }
        };

        // Helper function to format daily and hourly data
        const formatDailyData = () => Array.from({ length: forecast_days }, (_, i) => ({
            time: weatherData.daily.time[i],
            weatherCode: weatherData.daily.weatherCode[i],
            temperature2mMax: weatherData.daily.temperature2mMax[i],
            temperature2mMin: weatherData.daily.temperature2mMin[i],
            metadata: weatherData.metadata
        }));

        const formatHourlyData = () => Array.from({ length: forecast_days }, (_, i) => 
            Array.from({ length: 24 }, (_, j) => ({
                time: weatherData.hourly.time[i * 24 + j],
                temperature2m: weatherData.hourly.temperature2m[i * 24 + j],
                precipitationProbability: weatherData.hourly.precipitationProbability[i * 24 + j],
                precipitation: weatherData.hourly.precipitation[i * 24 + j],
                weatherCode: weatherData.hourly.weatherCode[i * 24 + j],
                isDay: weatherData.hourly.isDay[i * 24 + j],
                metadata: weatherData.metadata
            }))
        );

        // Assemble daily and hourly data into arrays
        weatherData.dailyData = formatDailyData();
        weatherData.hourlyData = formatHourlyData();

        //removing past hours form hourly data of today
        const today = new Date();
        const todayIndex = weatherData.hourlyData.findIndex((hour) => isToday(hour[0].time, timezone));
        for( let i = 0; i < 24; i++) {
            if(compareHoursTimezone(weatherData.hourlyData[todayIndex][0].time, today) < 0) {
                weatherData.hourlyData[todayIndex].shift();
            }
            else {
                break;
            }
        }


        // Logging for debug purposes
        // console.log(weatherData);

        return weatherData;

    } catch (error) {
        console.error("Error in fetching or processing weather data:", error);
        throw new Error("Failed to retrieve weather data");
    }
}
