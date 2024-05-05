import React from 'react';
import WeatherCode from './WeatherCode';
import { Text, Surface, Card } from 'react-native-paper';
import WeatherOfTheDayCard from './WeatherOfTheDayCard';
import { Pressable, ScrollView, View } from 'react-native';
import styles from '../styles.js'

export default function DailyWeatherBar(props){
    weatherData = props.weatherData
    day = props.day
    items = weatherData.map((data, index) => {
        return (
            <Pressable key={index} onPress={() => props.onPress(index)}>
                <WeatherOfTheDayCard isSelected={index==day} weatherData={data} />
            </Pressable>
        )
    })
    return (
        <View style={{padding:0}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {items}
            </ScrollView>
        </View>
    )
}