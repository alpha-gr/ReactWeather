import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import DailyWeather from './components/DailyWeather.js'
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
import styles from './styles.js';
import { StrictMode, useState } from 'react';
import { Button, Searchbar,  Surface, Text , Banner} from 'react-native-paper';

//the line below fixes a bug with Expo Go go not recognizing TextEncoder
import * as encoding from 'text-encoding'
import { MD3DarkTheme as DefaultTheme, PaperProvider, Appbar } from 'react-native-paper';
import Search from './components/Search'


export default function App() {
  
  const [city, setCity] = useState(null);
  console.log(city)
  
  return (
    <StrictMode>
      <PaperProvider>
        <Appbar.Header elevated="true">
          <Appbar.Content title="Weather App" />
        </Appbar.Header>
        <Surface style={styles.main}>
          <Search onClick={(city) =>{setCity(city)} }></Search>
          {city!=null && 
            <>
              <Text style={styles.h1}>{city.name}</Text>
              <CurrentWeatherCard city={city}/>   
            </>
          }
          <StatusBar style="auto" />
        </Surface>
      </PaperProvider>
    </StrictMode>
  );
}
