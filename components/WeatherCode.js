//this component takes in a weather code and displays an image, the temperature and a description of the weather
//shows the time if showTime is true
//shows the date if showDate is true
//weather codes are WMO codes
import { View, Image} from 'react-native'
import { Text } from 'react-native-paper'
import descriptions from './WeatherDescriptions.js'

export default function WeatherCode(props){
    weatherData = props.weatherData
    //console.log("WeatherCode.js: weatherData: ", weatherData)

    if(weatherData == undefined){
        return null
    }

    let code = weatherData["weatherCode"]
    let time = weatherData["isDay"] == 0 ? "night" : "day"
    let description = descriptions[code][time]["description"]
    let image = descriptions[code][time]["image"]
    //console.log(weatherData["time"])

    return (
            <View>
                <Image source={{ uri: image }} style={{ width: 70, height: 70 }} />
                {/* <Text>{description}</Text> */}
            </View>

    )
}