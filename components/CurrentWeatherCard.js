import WeatherCode from './WeatherCode';
import { Card } from 'react-native-paper'
import { View } from 'react-native';


export default function CurrentWeatherCard(props) {
    weatherData = props.weatherData

    return(
        <View>
            <Card elevation={3}>
                <WeatherCode weatherData={weatherData["current"]} showTime={false} />
            </Card>
        </View>
    )

}