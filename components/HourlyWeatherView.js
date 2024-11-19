import React, { useMemo } from 'react';
import WeatherCode from './WeatherCode';
import { Text, Surface, Card } from 'react-native-paper';
import WeatherOfTheDayCard from './WeatherOfTheDayCard';
import { FlatList, ScrollView, View } from 'react-native';
import WeatherOfTheHourCard from './WeatherOfTheHourCard';

import { isToday } from './scripts/timeHelper'
import { compareHoursTimezone } from './scripts/timeHelper';

export default function HourlyWeatherView(props){
    weatherData = props.weatherData

    return (
       <FlatList
            data={weatherData}
            renderItem={({item}) => <WeatherOfTheHourCard weatherData={item} key={item.key}/>}
            initialNumToRender={5}
            windowSize={5}
        />
    )
}