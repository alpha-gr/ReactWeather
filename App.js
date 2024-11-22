//the line below fixes a bug with Expo Go go not recognizing TextEncoder DO NOT REMOVE
import * as encoding from 'text-encoding'

import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, useColorScheme, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
import styles from './styles.js';
import { StrictMode, useState } from 'react';
import { IconButton, Surface, Text } from 'react-native-paper';
import { PaperProvider, Appbar, Button, ActivityIndicator } from 'react-native-paper';
import { darkTheme, lightTheme } from './themes.js';
import Search from './components/Search'
import { getWeatherData } from './components/weather.js';
import Forecast from './components/Forecast.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useCalendars } from 'expo-localization';
import fetchGeoLocation from './components/geoLocation.js';

export default function App() {

  const { height, width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;

  const colorScheme = useColorScheme()
  let theme = colorScheme == 'dark' ? darkTheme : lightTheme

  console.log("App.js: rerendering")

  const calendar = useCalendars()[0];
  const [searchBarKey, setSearchBarKey] = useState(0);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {//FETCH WEATHER DATA
    let ignore = false //to prevent race conditions

    if (city == null) {
      return
    }
    console.log("triggered weather fetch")

    setIsLoading(true)

    getWeatherData(city, calendar)
      .then(data => {
        if (!ignore) {
          console.log("App.js: Weather data received")
          setWeatherData(data)
          //console.log(weatherData)
          setIsLoading(false)
          setIsLoaded(true)
        }
      },
        (error) => {
          console.log("Error in weather fetching hook")
          console.log(error)
        }
      )
    return () => { ignore = true }
  }, [city]);

  const geoLocationHandlePress = async () => {
    if (isLoading) {
      return
    }
    console.log("geoLocationHandlePress called");
    setIsLoading(true);

    fetchGeoLocation()
      .then((city) => {
        console.log("App.js: Received city data from geolocation")
        setCity(city);
      })

  }



  return (
    <StrictMode>
      <PaperProvider theme={theme}>
        <Appbar.Header elevated="true">
          <Appbar.Content title="ReactWeather" />
        </Appbar.Header>
        <Surface style={styles.main} >
          <ScrollView
            style={[styles.scroll, isLargeScreen && styles.mainLargeScreen]}
            showsVerticalScrollIndicator={false}
          >
            <Search onClick={(city) => { setCity(city) }} key={searchBarKey}></Search>

            <Button
              mode='contained-tonal'
              icon='map-marker'
              onPress={() => { geoLocationHandlePress(); setSearchBarKey(searchBarKey + 1) }}
              style={styles.button}
            >
              use current position
            </Button>

            {(isLoading) &&
              <ActivityIndicator
                style={styles.loading}
                animating={true}
                size='large'
              />}

            {isLoaded && !isLoading &&
              <>
                <CurrentWeatherCard weatherData={weatherData["current"]} city={city} />
                <Forecast weatherData={weatherData} />
              </>
            }
          </ScrollView>
          <StatusBar style="auto" />
        </Surface>
      </PaperProvider>
    </StrictMode>
  );
}
