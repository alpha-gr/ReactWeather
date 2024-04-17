import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DailyWeather from './components/DailyWeather.js'
const styles = require('./styles.js')

export default function App() {
  return (
    <View style={styles.container}>
      <DailyWeather/>
      <StatusBar style="auto" />
    </View>
  );
}


