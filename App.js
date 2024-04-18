import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DailyWeather from './components/DailyWeather.js'
import CurrentWeatherCard from './components/CurrentWeatherCard.js';
const styles = require('./styles.js')

export default function App() {
  return (
    <View style={styles.main}>
      <CurrentWeatherCard/>

      <StatusBar style="auto" />
    </View>
  );
}


