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

    showDescription = props.showDescription == undefined ? false : props.showDescription

    let code = weatherData["weatherCode"]
    let time = weatherData["isDay"] == 0 ? "night" : "day"
    let description = descriptions[code][time]["description"]
    let image = descriptions[code][time]["image"]
    let uri = '../assets/weatherIcons/'+code+time+'.png'
    //console.log(weatherData["time"])

    return (
            <View style={{flexDirection:'column'}}>
                <Image source={image} style={{ width: 70, height: 70 }} />
                { showDescription && 
                    <Text variant='bodySmall' style={{width: 100}}>{description}</Text>
                }
            </View>

    )
}