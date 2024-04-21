import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'#ffff'
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffff',
  },
  altText: { 
    color: 'grey',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#576B83',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    size: 'auto',
    padding: '1%',
  },
});

module.exports = styles