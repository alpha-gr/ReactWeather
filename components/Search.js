//searchbar with preview of fetched items
import { View, Image} from 'react-native'
import { List, Portal, Searchbar, Text } from 'react-native-paper'
descriptions = require('./WeatherDescriptions.js') //import the descriptions
import { useState, useEffect } from 'react'
import CountryFlag from 'react-native-country-flag';
import styles from '../styles.js';
const max_fetch_results = 5

export default function Search(props){
    const [ city, setCity ] = useState('')
    return (
        <>
            <Searchbar style={styles.search} placeholder='enter city or postal code' 
                value={city}
                onChangeText={ (newCity) => {setCity(newCity)} }
            />
            <CityList city={city} {...props}/>
            
        </>
    )
}

function CityList(props){

    city= props.city
    const [cityList, setCityList] = useState([])
    displayList = []

    useEffect(() => {
        let ignore = false //to prevent race conditions

        if(city==null || city.length == 0){
            return
        }

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${max_fetch_results}&language=en&format=json`)
        .then(response => response.json())
        .then(data => {
            if(!ignore){
                console.log('received data')
                console.log(data)
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
            description={item.country + ', ' + item.admin1}
            left={props => <CountryFlag isoCode={item.country_code} size={20}/>}
            onPress={() => {props.onClick(item); setCityList([])}}
        />
    })

    return (
            <List.Section>
                {displayList}
            </List.Section>
    )
}