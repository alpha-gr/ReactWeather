import React from 'react';
import WeatherCode from './WeatherCode';
import { Text, Surface, Card } from 'react-native-paper';

export default function WeatherBar(props){
    weatherData = props.weatherData["daily"]
    let items = []
    //console.log(weatherData)
    // for( i = 0; i < 7; i++){
    //     items.push(
    //         <Card key={i} elevation={3}>
    //             <WeatherCode weatherData={weatherData} showTime={false} showDate={true}/>
    //         </Card>
    //     )
    // }
    return (
        <Surface>
            {items}
        </Surface>
    )
}