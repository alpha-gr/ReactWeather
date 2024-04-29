import WeatherCode from './WeatherCode';
import { Card } from 'react-native-paper'
import { View } from 'react-native';
import Temperature from './Temperature';
import DateTime from './DateTime';
import { useTheme } from 'react-native-paper';
import styles from '../styles.js'


export default function WeatherOfTheDayCard(props) {
    weatherData = props.weatherData
    const theme = useTheme()
    isSelected = props.isSelected

    return(
        <Card style={ [isSelected ? { backgroundColor: theme.colors.secondaryContainer } : {backgroundColor:theme.colors.background}, styles.pad]}>
            <DateTime weatherData={weatherData} showDate={true} />
            <Temperature weatherData={weatherData} />
            <WeatherCode weatherData={weatherData} showTime={false} />
        </Card>
    )

}