import { fetchWeatherApi } from 'openmeteo';

export function getWeatherData(): Promise<any> {
    return new Promise((resolve, reject) => {
        const params = {
			"latitude": 52.52,
			"longitude": 13.41,
			"current": ["temperature_2m", "is_day", "weather_code"],
			"timezone": "auto",
			"forecast_days": 1
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

                const current = response.current()!;

                // Note: The order of weather variables in the URL query and the indices below need to match!
                const weatherData = {
                    current: {
                        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                        temperature2m: current.variables(0)!.value(),
                        isDay: current.variables(1)!.value(),
                        weatherCode: current.variables(2)!.value(),
                    },
                };
				//log the weather data
				//console.log(weatherData);

                resolve(weatherData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

