//searchbar with preview of fetched items
import { View, Image} from 'react-native'
import { List, Portal, Searchbar, Surface, Text } from 'react-native-paper'
descriptions = require('./WeatherDescriptions.js') //import the descriptions
import { useState, useEffect } from 'react'
import CountryFlag from 'react-native-country-flag';
import styles from '../styles.js';
const max_fetch_results = 5

export default function Search(props){
    const [ city, setCity ] = useState('')
    const [ placeholder, setPlaceholder ] = useState('enter city name')
    return (
        <>
            <Searchbar style={styles.search} placeholder={placeholder}
                value={city}
                onChangeText={ (newCity) => {setCity(newCity)} 
                }
            />
            <CityList 
                city={city} 
                emptyCity={(cityName) => {setCity(''); setPlaceholder(cityName)}}
                {...props}/>
            
        </>
    )
}

function CityList(props){

    city= props.city
    const [cityList, setCityList] = useState([])
    displayList = []
    emptyCity = props.emptyCity

    useEffect(() => {
        let ignore = false //to prevent race conditions

        if(city==null || city.length == 0){
            return
        }

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${max_fetch_results}&language=en&format=json`)
        .then(response => response.json())
        .then(data => {
            if(!ignore){
                console.log('received search data')
                setCityList(data.results)
            }
        })
        return () => { ignore = true }
      }, [city]);  


    if(cityList==undefined){
        return null
    }
        
    displayList = cityList.map((item) => {
        return <List.Item
            key={item.id}
            title={item.name}
            description={(item.country!=undefined?item.country:'') + (item.admin1!=undefined ? ', '+item.admin1 : '')}
            left={props => <CountryFlag isoCode={item.country_code} size={20}/>}
            onPress={() => {props.onClick(item);  emptyCity(item.name) ; setCityList([]);}}
        />
    })

    return (
        displayList.length>0 &&
        // <Portal>
            <View style={styles.cityList}>
                <List.Section>
                    {displayList}
                </List.Section>
            </View>
        // </Portal>
    )
}