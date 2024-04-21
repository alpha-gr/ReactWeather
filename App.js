import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import DailyWeather from './components/DailyWeather.js'
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
const styles = require('./styles.js')
import { useState } from 'react';
import { Button, Searchbar,  Surface, Text , Banner} from 'react-native-paper';

//the line below fixes a bug with Expo Go go not recognizing TextEncoder
import * as encoding from 'text-encoding'
import { MD3DarkTheme as DefaultTheme, PaperProvider, Appbar } from 'react-native-paper';

let addressSubmit = ''

export default function App() {
  
  const [address, setAddress] = useState('');

  return (
    <PaperProvider>
      <Appbar.Header elevated="true">
      <Appbar.Content title="Weather App" />
    </Appbar.Header>
      <Surface style={styles.main}>
        <Searchbar placeholder='enter city or postal code' 
          value={address}
          onChangeText={setAddress}
          onSubmitEditing={()=>{addressSubmit = address; setAddress()}}
        />
        {/* <Text>or</Text>
        <Button icon="map-marker" mode="contained" onPress={() => console.log('Pressed')}>
          Use current position
        </Button> */}
        <CurrentWeatherCard city={addressSubmit}/>
        <StatusBar style="auto" />
      </Surface>
    </PaperProvider>
  );
}


