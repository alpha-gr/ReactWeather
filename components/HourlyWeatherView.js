import React from 'react';
import WeatherCode from './WeatherCode';
import { Text, Surface, Card } from 'react-native-paper';
import WeatherOfTheDayCard from './WeatherOfTheDayCard';
import { ScrollView, View } from 'react-native';
import WeatherOfTheHourCard from './WeatherOfTheHourCard';

export default function HourlyWeatherView(props){
    weatherData = props.weatherData

    items = weatherData.map((data, index) => {
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