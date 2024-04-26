import { StatusBar } from 'expo-status-bar';
import WeatherBar from './components/WeatherBar.js'
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
import styles from './styles.js';
import { StrictMode, useEffect, useState } from 'react';
import { ActivityIndicator, Surface, Text } from 'react-native-paper';

//the line below fixes a bug with Expo Go go not recognizing TextEncoder DO NOT REMOVE
import * as encoding from 'text-encoding'

import { MD3DarkTheme as DefaultTheme, PaperProvider, Appbar } from 'react-native-paper';
import Search from './components/Search'
import { getWeatherData } from './components/weather.js';


export default function App() {
  
  const [city, setCity] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let ignore = false //to prevent race conditions

    if(city==null){
        return
    } 

    setIsLoaded(false)
    setIsLoading(true)

    getWeatherData(city)
    .then(data => {
        if(!ignore){
            weatherData=data
            setIsLoaded(true)
            setIsLoading(false)
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
    <StrictMode>
      <PaperProvider>
        <Appbar.Header elevated="true">
          <Appbar.Content title="Weather App" />
        </Appbar.Header>
        <Surface style={styles.main}>
          <Search onClick={(city) =>{setCity(city)} }></Search>

          {isLoading && <ActivityIndicator animating={true} />}
          {isLoaded &&
            <>
              <Text style={styles.h1}>{city.name}</Text>
              <CurrentWeatherCard weatherData={weatherData}/> 
              <WeatherBar weatherData={weatherData}/>  
            </>
          }
          <StatusBar style="auto" />
        </Surface>
      </PaperProvider>
    </StrictMode>
  );
}
