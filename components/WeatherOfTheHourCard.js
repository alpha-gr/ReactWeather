import WeatherCode from './WeatherCode';
import { Card } from 'react-native-paper'
import { View } from 'react-native';
import Temperature from './Temperature';
import DateTime from './DateTime';
import styles from '../styles.js'
import { Surface } from 'react-native-paper';


export default function WeatherOfTheHourCard(props) {
    weatherData = props.weatherData

    return(
        <Surface style={styles.hourCard} >
            <DateTime weatherData={weatherData} showTime={true} />
            <Temperature weatherData={weatherData} />
            <WeatherCode weatherData={weatherData} showTime={false} />
        </Surface>
    )

}