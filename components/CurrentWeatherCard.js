import { Card, Text } from 'react-native-paper'
import { View } from 'react-native';
import WeatherCode from './WeatherCode';
import Temperature from './Temperature';
import style from '../styles.js'

export default function CurrentWeatherCard(props) {
    weatherData = props.weatherData
    city = props.city
    //console.log("CurrentWeatherCard.js: weatherData: ", weatherData)

    return(
        <Card style={styles.current} elevation={3}>
            <Text variant="displaySmall">{city.name}</Text>
            <Temperature weatherData={weatherData} />
            <WeatherCode weatherData={weatherData}/>
        </Card>
    )

}