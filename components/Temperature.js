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
        <View> 
            {showMaxMinTemps ? 
            <>
                <Text style={{ fontSize: 30 }}>{weatherData.temperature2mMax.toFixed(0)}°</Text>
                <Text style={{ fontSize: 20 }}>{weatherData.temperature2mMin.toFixed(0)}°</Text>
            </>
            :
                <Text style={{ fontSize: 30 }}>{weatherData.temperature2m.toFixed(0)}°</Text>
            }
        </View>
    )
}