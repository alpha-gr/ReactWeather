
import React , { useState, Alert } from 'react'
import { getWeatherData } from './weather';
import WeatherCode from './WeatherCode';
import { Text, Card, ActivityIndicator, Divider } from 'react-native-paper'
import { View } from 'react-native';

var weatherData = null
export default function CurrentWeatherCard(props) {
    city = props.city
    
    if(city==''){
        return(null)
    }

    const [ isLoaded, setIsLoaded ] = useState(false)
    var geolocation = null

    if( !isLoaded && city != ''){
        geolocation = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
        geolocation.then((value) => {
            console.log(value.json())
            weatherData = getWeatherData()
            weatherData.then((data) => {
                weatherData= data
                setIsLoaded(true)
                },
                (error) => {
                    console.log("Error fetching weather data")
                    console.log(error)
                }
            )
        })
    }


    return(
        <View>
            <Text>Current Weather in {city }:</Text>
            <Card elevation={3}>
                {isLoaded ? <WeatherCode weatherData={weatherData["current"]}/> 
                : 
                <ActivityIndicator animating={true} />}
            </Card>
        </View>
    )

}