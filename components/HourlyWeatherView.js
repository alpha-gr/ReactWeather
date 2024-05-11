import React from 'react';
import WeatherCode from './WeatherCode';
import { Text, Surface, Card } from 'react-native-paper';
import WeatherOfTheDayCard from './WeatherOfTheDayCard';
import { ScrollView, View } from 'react-native';
import WeatherOfTheHourCard from './WeatherOfTheHourCard';

import { isToday } from './scripts/timeHelper'
import { compareHoursTimezone } from './scripts/timeHelper';

export default function HourlyWeatherView(props){
    weatherData = props.weatherData

    now = new Date()

    items = weatherData.map((data, index) => {
        //do not display forecasts for past hours (accounts for timezone difference)
        
        if (isToday(data["time"], data["time"]["timezone"]) && compareHoursTimezone(data["time"], now) < 0) {
            return null
        }
        return (
            <WeatherOfTheHourCard key={index} weatherData={data}/>
        )
    })

    return (
        <View>
            {items}
        </View>
    )
}