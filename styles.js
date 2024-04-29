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
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 5,
  borderBottomColor: 'gray',
  borderBottomWidth: 0.2,
},
 pad:{
  borderBottomLeftRadius:0,
  borderBottomRightRadius:0,
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
});

