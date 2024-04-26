//this component takes in a weather code and displays an image, the temperature and a description of the weather
//shows the time if showTime is true
//shows the date if showDate is true
//weather codes are WMO codes
import { View, Image} from 'react-native'
import { Text } from 'react-native-paper'
descriptions = require('./WeatherDescriptions.js') //import the descriptions

timeFormatOptions= {hour: '2-digit', minute: '2-digit'}//for time formatting
dateFormatOptions = {weekday: 'long', day: 'numeric'}//for date formatting

export default function WeatherCode(props){
    showTime = props.showTime
    showDate = props.showDate
    weatherData = props.weatherData

    let code = weatherData["weatherCode"]
    let time = weatherData["isDay"] == 1 ? "day" : "night"
    let description = descriptions[code][time]["description"]
    let image = descriptions[code][time]["image"]
    //console.log(weatherData["time"])
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' , padding:10}}>
            <Text style={{ fontSize: 30 }}>{weatherData.temperature2m.toFixed(0)}°</Text>
            <View>
                <Image source={{ uri: image }} style={{ width: 70, height: 70 }} />
                <Text>{description}</Text>
                {showTime && <Text>{weatherData["time"].toLocaleTimeString(undefined, timeFormatOptions)}</Text>}
                {showDate && <Text>{weatherData["time"].toLocaleDateString(undefined, dateFormatOptions)}</Text>}
            </View>
        </View>
    )
}