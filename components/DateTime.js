import { View } from 'react-native'
import { Card, Text } from 'react-native-paper'

import { isToday } from './scripts/timeHelper'
import { useMemo } from 'react'


export default function DateTime(
    props = {
        weatherData: {},
        showTime: false,
        showDate: false
    }
) {
    showTime = props.showTime
    showDate = props.showDate
    weatherData = props.weatherData
    metadata = weatherData["metadata"]
    
    // Calcola solo se timezone cambia
    const timeFormatOptions = useMemo(
        () => ({ hour: '2-digit', minute: '2-digit', timeZone: metadata.timezone }),
        [metadata.timezone]
    );

    const dateFormatOptions = useMemo(
        () => ({ weekday: 'short', timeZone: metadata.timezone }),
        [metadata.timezone]
    );

    var formattedTime = ""
    if (showTime) {
        formattedTime = weatherData["time"].toLocaleTimeString(undefined, timeFormatOptions);
    }
    var formattedDate = ""
    if (showDate) {
        formattedDate = weatherData["time"].toLocaleDateString(undefined, dateFormatOptions);
    }
    isDateToday = false
    if (showDate) {
        isDateToday = isToday(weatherData["time"], weatherData["metadata"])
    }

    return (
        <View style={{ padding: 10, alignSelf: 'center' }}>
            {showTime && <Text variant='titleMedium'>{formattedTime}</Text>}
            {showDate && !isDateToday && <Text>{formattedDate}</Text>}
            {showDate && isDateToday && <Text>Today</Text>}
        </View>
    )
}