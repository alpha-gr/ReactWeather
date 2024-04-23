//this component takes in a weather code and displays an image based on the code
//and a description of the weather
//weather codes are WMO codes
import { View, Image} from 'react-native'
import { Text } from 'react-native-paper'
descriptions = require('./WeatherDescriptions.js') //import the descriptions

export default function WeatherCode(weatherData){
    weatherData = weatherData["weatherData"]
    let code = weatherData["weatherCode"]
    let time = weatherData["isDay"] == 1 ? "day" : "night"
    let description = descriptions[code][time]["description"]
    let image = descriptions[code][time]["image"]
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' , padding:10}}>
            <Text style={{ fontSize: 30 }}>{weatherData.temperature2m.toFixed(0)}°</Text>
            <View>
                <Image source={{ uri: image }} style={{ width: 70, height: 70 }} />
                <Text>{description}</Text>
            </View>
        </View>
    )
}