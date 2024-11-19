import { View} from 'react-native'
import { Card, Text } from 'react-native-paper'

import { isToday } from './scripts/timeHelper'


export default function DateTime(props){

    weatherData = props.weatherData
    metadata = weatherData["metadata"]
    
    timeFormatOptions= {hour: '2-digit', minute: '2-digit', timeZone: metadata["timezone"]}
    dateFormatOptions = {weekday: 'short', timeZone: metadata["timezone"]}

    showTime = props.showTime == undefined ? false : props.showTime 
    showDate = props.showDate == undefined ? false : props.showDate

    //isDateToday = weatherData["time"].getDate() == new Date().getDate() //TODO fix for different timezones

    isDateToday = false
    if(showDate){
        isDateToday = isToday(weatherData["time"], weatherData["metadata"])
    }

    return (
        <View style={{padding:10, alignSelf:'center'}}> 
            {showTime && <Text variant='titleMedium'>{weatherData["time"].toLocaleTimeString(undefined, timeFormatOptions)}</Text>}
            {showDate && !isDateToday && <Text>{weatherData["time"].toLocaleDateString(undefined, dateFormatOptions)}</Text>}
            {showDate && isDateToday && <Text>Today</Text>}
        </View>
    )
}