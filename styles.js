import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  search: {
    margin: 10,
    marginHorizontal: 10,
  },
  button:{
    margin: 10,
    marginTop: 0,
    marginHorizontal: 10,
  },
  scroll: {
    width: '100%',
    padding: 0,
  },
  searchResults: {  

},
loading:{
    margin: 40,
},
hourCard:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 5,
  borderBottomColor: 'gray',
  borderBottomWidth: 0.2,
  height: 80,
},
 pad:{
  borderBottomLeftRadius:0,
  borderBottomRightRadius:0,
  width: 80,
 },
  current: {
    flex: 1,
  },
  city: {
    textAlign: 'left',
    margin: 10,
  },
  temperatureBig: {
    alignItems:'flex-center',
    marginLeft: 10,
  },
  temperature: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherCode: {
    flexDirection: 'column',
    alignItems : 'center',
    alignContent: 'center',
    alignSelf: 'center', 
  },
  description: {
    textAlign: 'center',
    margin:5
  },
  weatherCodeLarge: {
    flexDirection: 'column',
    alignItems : 'flex-end',
  },
  descriptionLarge: {
    textAlign: 'right',
    marginBottom: 10,
    marginRight:30,
  },
  cityList: {
    padding: 10,
  },
  mainLargeScreen: {
    width: '40%', // Riduce la larghezza su schermi grandi
  },
});

