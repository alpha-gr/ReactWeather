import WeatherCode from './WeatherCode';
import { Card } from 'react-native-paper'
import { View } from 'react-native';
import Temperature from './Temperature';
import DateTime from './DateTime';


export default function WeatherOfTheHourCard(props) {
    weatherData = props.weatherData

    return(
        <View>
            <Card elevation={3}>
                <DateTime weatherData={weatherData} showTime={true} />
                <Temperature weatherData={weatherData} />
                <WeatherCode weatherData={weatherData} showTime={false} />
            </Card>
        </View>
    )

}