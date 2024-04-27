import { Card, Text } from 'react-native-paper'
import { View } from 'react-native';
import WeatherCode from './WeatherCode';
import Temperature from './Temperature';


export default function CurrentWeatherCard(props) {
    weatherData = props.weatherData
    //console.log("CurrentWeatherCard.js: weatherData: ", weatherData)

    return(
        <Card elevation={3}>
            <Text>current weather:</Text>
            <Temperature weatherData={weatherData} />
            <WeatherCode weatherData={weatherData}/>
        </Card>
    )

}