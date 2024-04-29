import { View} from 'react-native'
import { Card, Text } from 'react-native-paper'

timeFormatOptions= {hour: '2-digit', minute: '2-digit'}//for time formatting
dateFormatOptions = {weekday: 'long'}//for date formatting

export default function Temperature(props){
    weatherData = props.weatherData

    showTime = props.showTime == undefined ? false : props.showTime 
    showDate = props.showDate == undefined ? false : props.showDate

    isDateToday = weatherData["time"].getDate() == new Date().getDate()

    return (
        <View> 
            {showTime && <Card><Text variant='titleMedium'>{weatherData["time"].toLocaleTimeString(undefined, timeFormatOptions)}</Text></Card>}
            {showDate && !isDateToday && <Text>{weatherData["time"].toLocaleDateString(undefined, dateFormatOptions)}</Text>}
            {showDate && isDateToday && <Text>Today</Text>}
        </View>
    )
}