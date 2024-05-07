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
import { useCalendars } from 'expo-localization';

//TODO: remove spinner if error occurs
//TODO: display errors to user

export default function App() {
  
  const calendars = useCalendars();
  const [city, setCity] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading  , setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [usePosition, setUsePosition] = useState(false);
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [useLocationName, setUseLocationName] = useState(false);
  const [isLoadingLocationName, setIsLoadingLocationName] = useState(false);
  const [coords, setCoords] = useState(null);


  useEffect(() => {//FETCH WEATHER DATA
    let ignore = false //to prevent race conditions

    if(city==null || isLoading || isLoaded || usePosition || isLoadingPosition || useLocationName || isLoadingLocationName){
        return
    } 
    console.log("triggered weather fetch")

    setIsLoaded(false)
    setIsLoading(true)

    getWeatherData(city, calendars[0])
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
        console.log("Error in weather fetching hook")
        console.log(error)
    }
    )
    return () => { ignore = true }
  }, [city, isLoadingLocationName]);

  useEffect(() => {//FETCH GEOLOCATION DATA
    let ignore = false //to prevent race conditions
    if(usePosition==false || isLoading || isLoaded || isLoadingPosition || useLocationName || isLoadingLocationName){ 
        return
    } 

    console.log("triggered location fetch")

    setIsLoaded(false)
    setIsLoadingPosition(true)

    Location.requestForegroundPermissionsAsync()
    .then(
      (status) => {
        if(!status.granted){
          console.log(status)
          alert("Location permission denied")
          setUsePosition(false)
          setIsLoaded(false)
          setIsLoadingPosition(false)
          return
        }
        Location.getCurrentPositionAsync({})
        .then(location=>{
          console.log("Received location data")
          //console.log(location)
          //location.coords.name = "Current Position"
          setUsePosition(false)
          setCoords(location.coords)
          setIsLoaded(false)
          setIsLoadingPosition(false)
          setIsLoadingLocationName(false)
          setUseLocationName(true)
        })

      },(error) => {
        console.log("Error getting location data")
        console.log(error)
      }
    ),
    (error) => {
        console.log("Error in location hook")
        console.log(error)
    }
    return () => { ignore = true ; setUsePosition(false) }
  }, [usePosition, isLoading, isLoaded]);

  useEffect(() => {//FETCH INVERSE GEOLOCATION DATA
    let ignore = false //to prevent race conditions
    if(useLocationName==false || isLoading || isLoaded || isLoadingPosition || usePosition || isLoadingLocationName){
        return
    } 

    console.log("triggered inverse geocoding fetch") 

    setIsLoaded(false)
    setIsLoadingLocationName(true)
    
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
        console.log("Received inverse geocoding data")
        //console.log(data)
        let city = {}
        city.name=data["city"]
        city.latitude=data["latitude"]
        city.longitude=data["longitude"]
        city.admin1=data["principalSubdivision"]
        city.isCurrentLocation=true
        setIsLoaded(false)
        setIsLoadingLocationName(false)
        setUseLocationName(false)
        setCity(city)
    },(error) => {
      console.log("Error getting inverse geocoding data")
      console.log(error)
    }
  ),
    (error) => {
        console.log("Error in inverse geocoding hook")
        console.log(error)
    }
    return () => { ignore = true ; setUseLocationName(false) }
  }, [useLocationName, isLoading, isLoaded]);

  
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
        style={styles.button}
        >
          use current position
        </Button>

        { (isLoading || isLoadingPosition || isLoadingLocationName) && 
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
