import { View, Image} from 'react-native'
import { Text } from 'react-native-paper'

export default function Temperature(props){
    weatherData = props.weatherData
    //console.log("Temperature.js: weatherData: ", weatherData)

    if(weatherData == undefined){
        return null
    }

    let showMaxMinTemps = false
    if(weatherData.temperature2m == undefined){
        showMaxMinTemps = true
    }

    return (
        <View style={{alignSelf:'center'}}> 
            {showMaxMinTemps ? 
            <>
                <Text variant='bodyLarge'>{Math.round(weatherData.temperature2mMax)}°</Text>
                <Text variant='bodySmall'>{Math.round(weatherData.temperature2mMin)}°</Text>
            </>
            :
                <Text variant='bodyLarge'>{Math.round(weatherData.temperature2m)}°</Text>
            }
        </View>
    )
}