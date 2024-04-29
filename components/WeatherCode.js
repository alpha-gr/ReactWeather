//this component takes in a weather code and displays an image, the temperature and a description of the weather
//shows the time if showTime is true
//shows the date if showDate is true
//weather codes are WMO codes
import { View, Image} from 'react-native'
import { Text } from 'react-native-paper'
import descriptions from './WeatherDescriptions.js'
import styles from '../styles.js'

export default function WeatherCode(props){
    weatherData = props.weatherData
    //console.log("WeatherCode.js: weatherData: ", weatherData)

    if(weatherData == undefined){
        return null
    }

    showDescription = props.showDescription == undefined ? false : props.showDescription
    iconSize = 70
    size = props.size
    textVariant = 'bodySmall'
    textStyle = styles.description
    style = styles.weatherCode
    if(size == "large"){
        iconSize = 100
        textVariant = 'bodyLarge'
        textStyle = styles.descriptionLarge
        style = styles.weatherCodeLarge
    }
    if(size=="small"){
        iconSize = 50
    }

    let code = weatherData["weatherCode"]
    let time = weatherData["isDay"] == 0 ? "night" : "day"
    let description = descriptions[code][time]["description"]
    let image = descriptions[code][time]["image"]
    let uri = '../assets/weatherIcons/'+code+time+'.png'
    //console.log(weatherData["time"])

    return (
            <View style={style}>
                <Image source={image} style={{ width: iconSize, height: iconSize, alignSelf:'flex-end' }} />
                { showDescription && 
                    <Text variant={textVariant} style={textStyle}>{description}</Text>
                }
            </View>

    )
}