import React from 'react';
import WeatherCode from './WeatherCode';
import { Text, Surface, Card } from 'react-native-paper';
import WeatherOfTheDayCard from './WeatherOfTheDayCard';
import { ScrollView, View } from 'react-native';
import WeatherOfTheHourCard from './WeatherOfTheHourCard';

function isToday(date){
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()
}

export default function HourlyWeatherView(props){
    weatherData = props.weatherData
    today = new Date()

    items = weatherData.map((data, index) => {
        //do not display forecasts for past hours
        if (isToday(data["time"]) && data["time"].getHours() < today.getHours()){
            return null
        }
        return (
            <WeatherOfTheHourCard key={index} weatherData={data} />
        )
    })

    return (
        <View>
            {items}
        </View>
    )
}