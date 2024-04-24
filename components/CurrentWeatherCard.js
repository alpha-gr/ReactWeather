
import React , { useState, Alert, useEffect } from 'react'
import { getWeatherData } from './weather';
import WeatherCode from './WeatherCode';
import { Text, Card, ActivityIndicator} from 'react-native-paper'
import { View } from 'react-native';

var weatherData = null
export default function CurrentWeatherCard(props) {
    city = props.city
    
    if(city==null){
        return(null)
    }

    const [ isLoaded, setIsLoaded ] = useState(false)
    var geolocation = null

    useEffect(() => {
        let ignore = false //to prevent race conditions

        if(city==null){
            return
        }
        setIsLoaded(false)

        getWeatherData(city)
        .then(data => {
            if(!ignore){
                console.log(data)
                weatherData=data
                setIsLoaded(true)
            }
        },
        (error) => {
            console.log("Error fetching weather data")
            console.log(error)
        }
    )
        return () => { ignore = true }
      }, [city]);  


    return(
        <View>
            <Card elevation={3}>
                {isLoaded ? <WeatherCode weatherData={weatherData["current"]}/> 
                : 
                <ActivityIndicator animating={true} />}
            </Card>
        </View>
    )

}