import { View, Image} from 'react-native'
import { Text } from 'react-native-paper'
import styles from '../styles'

export default function Temperature(props){
    weatherData = props.weatherData
    //console.log("Temperature.js: weatherData: ", weatherData)

    if(weatherData == undefined){
        return null
    }

    let size = props.size
    let showMaxMinTemps = false
    if(weatherData.temperature2m == undefined){
        showMaxMinTemps = true
    }

    let style = styles.temperature
    if(size == 'large'){
        style = styles.temperatureBig
    }

    return (
        <View style={style}> 
            {showMaxMinTemps ? 
            <>
                <Text variant='bodyLarge'>{Math.round(weatherData.temperature2mMax)}°</Text>
                <Text variant='bodySmall'>{Math.round(weatherData.temperature2mMin)}°</Text>
            </>
            :
                (size == 'large') ? <Text variant='displaySmall'>{Math.round(weatherData.temperature2m)}°</Text>
                : <Text variant='bodyLarge'>{Math.round(weatherData.temperature2m)}°</Text>
            }
        </View>
    )
}