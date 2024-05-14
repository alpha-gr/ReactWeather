//the line below fixes a bug with Expo Go go not recognizing TextEncoder DO NOT REMOVE
import * as encoding from 'text-encoding'

import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
import styles from './styles.js';
import { StrictMode, useState } from 'react';
import { IconButton, Surface, Text } from 'react-native-paper';
import { PaperProvider, Appbar, Button, ActivityIndicator, MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import Search from './components/Search'
import { getWeatherData } from './components/weather.js';
import Forecast from './components/Forecast.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useCalendars } from 'expo-localization';

//TODO: remove spinner if error occurs
//TODO: display errors to user
//TODO: clean up the state variables ( use a reducer ?)
//TODO: too many rerenders, optimize

const lightTheme =
{
  ...MD3LightTheme,
  "colors": {
    "primary": "rgb(0, 105, 107)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(111, 246, 249)",
    "onPrimaryContainer": "rgb(0, 32, 33)",
    "secondary": "rgb(74, 99, 99)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(204, 232, 232)",
    "onSecondaryContainer": "rgb(4, 31, 32)",
    "tertiary": "rgb(76, 95, 124)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(212, 227, 255)",
    "onTertiaryContainer": "rgb(6, 28, 54)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(250, 253, 252)",
    "onBackground": "rgb(25, 28, 28)",
    "surface": "rgb(250, 253, 252)",
    "onSurface": "rgb(25, 28, 28)",
    "surfaceVariant": "rgb(218, 228, 228)",
    "onSurfaceVariant": "rgb(63, 73, 73)",
    "outline": "rgb(111, 121, 121)",
    "outlineVariant": "rgb(190, 200, 200)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(45, 49, 49)",
    "inverseOnSurface": "rgb(239, 241, 241)",
    "inversePrimary": "rgb(76, 218, 221)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(238, 246, 245)",
      "level2": "rgb(230, 241, 240)",
      "level3": "rgb(223, 237, 236)",
      "level4": "rgb(220, 235, 235)",
      "level5": "rgb(215, 232, 232)"
    },
    "surfaceDisabled": "rgba(25, 28, 28, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 28, 0.38)",
    "backdrop": "rgba(41, 50, 50, 0.4)"
  }
}


const darkTheme = 
{
  ...MD3DarkTheme,
  "colors": {
    "primary": "rgb(76, 218, 221)",
    "onPrimary": "rgb(0, 55, 56)",
    "primaryContainer": "rgb(0, 79, 81)",
    "onPrimaryContainer": "rgb(111, 246, 249)",
    "secondary": "rgb(176, 204, 204)",
    "onSecondary": "rgb(27, 52, 53)",
    "secondaryContainer": "rgb(50, 75, 76)",
    "onSecondaryContainer": "rgb(204, 232, 232)",
    "tertiary": "rgb(180, 200, 233)",
    "onTertiary": "rgb(30, 49, 76)",
    "tertiaryContainer": "rgb(53, 72, 99)",
    "onTertiaryContainer": "rgb(212, 227, 255)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(25, 28, 28)",
    "onBackground": "rgb(224, 227, 226)",
    "surface": "rgb(25, 28, 28)",
    "onSurface": "rgb(224, 227, 226)",
    "surfaceVariant": "rgb(63, 73, 73)",
    "onSurfaceVariant": "rgb(190, 200, 200)",
    "outline": "rgb(137, 147, 146)",
    "outlineVariant": "rgb(63, 73, 73)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(224, 227, 226)",
    "inverseOnSurface": "rgb(45, 49, 49)",
    "inversePrimary": "rgb(0, 105, 107)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(28, 38, 38)",
      "level2": "rgb(29, 43, 43)",
      "level3": "rgb(31, 49, 49)",
      "level4": "rgb(31, 51, 51)",
      "level5": "rgb(32, 55, 55)"
    },
    "surfaceDisabled": "rgba(224, 227, 226, 0.12)",
    "onSurfaceDisabled": "rgba(224, 227, 226, 0.38)",
    "backdrop": "rgba(41, 50, 50, 0.4)"
  }
}

export default function App() {

  const colorScheme = useColorScheme()
  let theme = colorScheme == 'dark' ? darkTheme : lightTheme
  //let theme = lightTheme
  //let theme = darkTheme

  console.log("App.js: rerendering")
  
  const [key, setKey] = useState(0);
  const calendar = useCalendars()[0];
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

    getWeatherData(city, calendar)
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
    <PaperProvider theme={theme}>
      <Appbar.Header elevated="true">
        <Appbar.Content title="Weather App" />
      </Appbar.Header>
      <Surface style={styles.main} >
        <ScrollView style={styles.scroll}>
        <Search onClick={(city) =>{setCity(city); setIsLoaded(false)}} key={key}></Search>

        <Button 
        mode= 'contained-tonal'
        icon='map-marker'
        onPress={() => {setUsePosition(true); setIsLoaded(false); setKey(key+1)}}
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
