import { Text } from "react-native";
const styles = require('../styles.js')

const AppText = ({children}) => {
        return (
            <Text style={styles.text}>{children}</Text>
        );
    };

export default AppText
