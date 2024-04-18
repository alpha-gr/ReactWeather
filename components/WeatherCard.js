import {View } from 'react-native';
import React , { useState } from 'react'
import DayCard from './DayCard';
import AppText from './AppText';
const styles = require('../styles.js')
import { getWeatherData } from './weather';
import WeatherCode from './WeatherCode';

let weatherData = null
export default function WeatherCard() {

    const [ isLoaded, setIsLoaded ] = useState(false)

    if(!isLoaded){
        weatherData = getWeatherData()
        weatherData.then((data) => {
            console.log("weather data fetched successfully")
            console.log(data)
            weatherData= data
            setIsLoaded(true)

        })
    }


    return(
        <View style={styles.card}>
            <AppText >Current Weather:</AppText>
            {isLoaded ? <WeatherCode weatherData={weatherData["current"]}/> 
            : 
            <AppText >Loading...</AppText>}
        </View>
    )

}