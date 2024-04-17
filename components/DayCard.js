import { Text, View } from 'react-native';


export default function DayCard( {date, weatherData} ){
    return(
        <View>
            <Text>
                {date},  high: {weatherData.daily.temperature2mMax}
            </Text>
        </View>
    )
}

