import { View, Image} from 'react-native'
import { Text } from 'react-native-paper'

timeFormatOptions= {hour: '2-digit', minute: '2-digit'}//for time formatting
dateFormatOptions = {weekday: 'long', day: 'numeric'}//for date formatting

export default function Temperature(props){
    weatherData = props.weatherData

    showTime = props.showTime == undefined ? false : props.showTime 
    showDate = props.showDate == undefined ? false : props.showDate

    return (
        <View> 
            {showTime && <Text>{weatherData["time"].toLocaleTimeString(undefined, timeFormatOptions)}</Text>}
            {showDate && <Text>{weatherData["time"].toLocaleDateString(undefined, dateFormatOptions)}</Text>}
        </View>
    )
}