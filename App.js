import { StatusBar } from 'expo-status-bar';
import WeatherBar from './components/WeatherBar'
import { ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
import styles from './styles.js';
import { StrictMode, useState } from 'react';
import { Surface, Text } from 'react-native-paper';

//the line below fixes a bug with Expo Go go not recognizing TextEncoder DO NOT REMOVE
import * as encoding from 'text-encoding'

import { MD3DarkTheme as DefaultTheme, PaperProvider, Appbar } from 'react-native-paper';
import Search from './components/Search'
import { getWeatherData } from './components/weather.js';
//weatherData = null

export default function App() {
  
  const [city, setCity] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading  , setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    let ignore = false //to prevent race conditions

    if(city==null || isLoading || isLoaded){
        return
    } 

    setIsLoaded(false)
    setIsLoading(true)

    getWeatherData(city)
    .then(data => {
        if(!ignore){
          setIsLoaded(true)
          setIsLoading(false)
          setWeatherData(data)
          console.log("App.js: Weather data received")
          console.log(weatherData)
        }
    },
    (error) => {
        console.log("Error fetching weather data")
        console.log(error)
    }
    )
    return () => { ignore = true }
  }, [city]);

  
  return (

      <PaperProvider>
        <Appbar.Header elevated="true">
          <Appbar.Content title="Weather App" />
        </Appbar.Header>
        <Surface style={styles.main}>
          <Search onClick={(city) =>{setCity(city); setIsLoaded(false)} }></Search>

          {isLoading && <ActivityIndicator animating={true} />}
          {isLoaded &&
            <>
              <Text style={styles.h1}>{city.name}</Text>
              <CurrentWeatherCard weatherData={weatherData}/> 
              {/* <WeatherBar weatherData={weatherData}/>   */}
            </>
          }
          <StatusBar style="auto" />
        </Surface>
      </PaperProvider>
 
  );
}
