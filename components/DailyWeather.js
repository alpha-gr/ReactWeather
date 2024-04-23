import { StyleSheet, Text, View } from 'react-native';
import { fetchWeatherApi } from 'openmeteo';
import React , { useState } from 'react'
//import DayCard from './DayCard';
const styles = require('../styles.js')

export default function DailyWeather() {

const [ isLoaded, setIsLoaded ] = useState(false)

const params = {
	"latitude": 44.4938,
	"longitude": 11.3387,
	"daily": ["temperature_2m_max", "temperature_2m_min"],
	"forecast_days": 1
};
const url = "https://api.open-meteo.com/v1/forecast";
const response = fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start, stop, step) =>
Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

let weatherData = null

response.then(
	(response) => {
		// Attributes for timezone and location
		console.log(response)
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const timezone = response.timezone();
		const timezoneAbbreviation = response.timezoneAbbreviation();
		const latitude = response.latitude();
		const longitude = response.longitude();

		const daily = response.daily();

		// Note: The order of weather variables in the URL query and the indices below need to match!
		weatherData = {

			daily: {
				time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				temperature2mMax: daily.variables(0).valuesArray(),
				temperature2mMin: daily.variables(1).valuesArray(),
			},

		};

		// `weatherData` now contains a simple structure with arrays for datetime and weather data
		for (let i = 0; i < weatherData.daily.time.length; i++) {
			console.log(
				weatherData.daily.time[i].toISOString(),
				weatherData.daily.temperature2mMax[i],
				weatherData.daily.temperature2mMin[i]
			);
		}
	}
)
    return (
        <View>
			{isLoaded ? 
				<DayCard weatherData={weatherData}></DayCard> 
				: 
				<Text style={styles.text}>Loading...</Text>
			}
        </View>
    );
}