//this component takes in a weather code and displays an image based on the code
//and a description of the weather
//weather codes are WMO codes
import { View, Image } from 'react-native'
import AppText from './AppText.js'
descriptions = require('./WeatherDescriptions.js') //import the descriptions

export default function WeatherCode(weatherData){
    weatherData = weatherData["weatherData"]
    let code = weatherData["weatherCode"]
    let time = weatherData["isDay"] == 1 ? "day" : "night"
    let description = descriptions[code][time]["description"]
    let image = descriptions[code][time]["image"]
    return(
        <View>
            <AppText>{description}</AppText>
            <Image source={{uri: image}} style={{width: 50, height: 50}}/>
        </View>
    )
}