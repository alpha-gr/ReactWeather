//the line below fixes a bug with Expo Go go not recognizing TextEncoder DO NOT REMOVE
import * as encoding from 'text-encoding'

import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
import styles from './styles.js';
import { StrictMode, useState } from 'react';
import { IconButton, Surface, Text } from 'react-native-paper';
import { PaperProvider, Appbar, Button, ActivityIndicator } from 'react-native-paper';
import Search from './components/Search'
import { getWeatherData } from './components/weather.js';
import Forecast from './components/Forecast.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

//weatherData = null

// _storeData = async () => {
//   try {
//     await AsyncStorage.setItem(
//       'CITY',
//       'Bologna',
//     );
//   } catch (error) {
//     // Error saving data
//     console.log(error)
//   }
// };

// _retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('CITY');
//     if (value !== null) {
//       // We have data!!
//       console.log('cached data: '+ value);
//     }
//   } catch (error) {
//     // Error retrieving data
//     console.log(error)
//   }
// };

export default function App() {
  
  const [city, setCity] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading  , setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [usePosition, setUsePosition] = useState(false);

  useEffect(() => {//FETCH WEATHER DATA
    let ignore = false //to prevent race conditions

    if(city==null || isLoading || isLoaded || usePosition){
        return
    } 

    setIsLoaded(false)
    setIsLoading(true)

    console.log(city)
    getWeatherData(city)
    .then(data => {
        if(!ignore){
          console.log("App.js: Weather data received")
          setWeatherData(data)
          //console.log(weatherData)
          setIsLoaded(true)
          setIsLoading(false)
        }
    },
    (error) => {
        console.log("Error fetching weather data")
        console.log(error)
    }
    )
    return () => { ignore = true }
  }, [city]);

  useEffect(() => {//FETCH GEOLOCATION DATA
    let ignore = false //to prevent race conditions
    console.log("usePosition: "+ usePosition)
    if(usePosition==false || isLoading || isLoaded){
        return
    } 

    setIsLoaded(false)
    setIsLoading(true)

    Location.requestForegroundPermissionsAsync()
    .then(
      (status) => {
        if(!status.granted){
          console.log(status)
          alert("Location permission denied")
          setUsePosition(false)
          setIsLoaded(false)
          return
        }
        Location.getCurrentPositionAsync({})
        .then(location=>{
          console.log("Received location data")
          console.log(location)
          location.coords.name = "Current Position"
          setUsePosition(false)
          setCity(location.coords)
          setIsLoaded(false)
          setIsLoading(false)
        })

      }),
    (error) => {
        console.log("Error fetching weather data")
        console.log(error)
    }
    return () => { ignore = true ; setUsePosition(false) }
  }, [usePosition]);
  
  return (
    <PaperProvider>
      <Appbar.Header elevated="true">
        <Appbar.Content title="Weather App" />
      </Appbar.Header>
      <Surface style={styles.main} >
        <ScrollView style={styles.scroll}>
        <Search onClick={(city) =>{setCity(city); setIsLoaded(false)} }></Search>

        <Button 
        mode= 'contained-tonal'
        icon='map-marker'
        onPress={() => {setUsePosition(true); setIsLoaded(false)}}
        >
          use current position
        </Button>

        {isLoading && 
          <ActivityIndicator
            style={styles.loading}
            animating={true} 
            size='large'
          />}

        {isLoaded && 
          <>
            <CurrentWeatherCard weatherData={weatherData["current"]} city={city}/> 
            <Forecast weatherData={weatherData}/>  
          </>
        }
        </ScrollView>
        <StatusBar style="auto" />
      </Surface>
    </PaperProvider>
  );
}
