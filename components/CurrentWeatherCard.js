import { Card, Surface, Text } from 'react-native-paper'
import { View } from 'react-native';
import WeatherCode from './WeatherCode';
import Temperature from './Temperature';
import style from '../styles.js'
import WeatherIcon from './WeatherIcon';

export default function CurrentWeatherCard(props) {
    weatherData = props.weatherData
    city = props.city
    //console.log("CurrentWeatherCard.js: weatherData: ", weatherData)

    return(
        <Surface elevation={0} style={styles.current}>
            <Text style={styles.city} variant="displaySmall">{city.name}</Text>
            <Temperature weatherData={weatherData} size='large'/>
            <WeatherCode weatherData={weatherData} showDescription={true} size={'large'}/>
            <WeatherIcon code={weatherData.weatherCode} isDay={weatherData.isDay} size={'large'} style={'animated'}/>
        </Surface>
    )

}