import React from 'react';
import WeatherCode from './WeatherCode';
import { Text, Surface, Card } from 'react-native-paper';

export default function DailyWeatherCard(props){
    let items = []
    for( i = 0; i < 5; i++){
        items.push(
            <Card key={i}>
            <Text>Day {i}</Text>
            <Text>6&deg;</Text>
            </Card>
        )
    }
    return (
        <Surface>
            {items}
        </Surface>
    )
}