import React, { useState } from 'react';
import { Text, Surface, Card } from 'react-native-paper';
import WeatherOfTheDayCard from './WeatherOfTheDayCard';
import { ScrollView } from 'react-native';
import DailyWeatherBar from './DailyWeatherBar';
import HourlyWeatherView from './HourlyWeatherView';

export default function Forecast(props){
    const [day, setDay] = useState(0)

    weatherData = props.weatherData
    return(
        <Surface>
            <Text>weather for the next days:</Text>
            <DailyWeatherBar onPress={(newDay)=>setDay(newDay)} weatherData={weatherData["dailyData"]} day={day} />
            <HourlyWeatherView weatherData={weatherData["hourlyData"][day]}/>
        </Surface>
    )
}