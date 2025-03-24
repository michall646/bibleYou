import AsyncStorage from "@react-native-async-storage/async-storage"

const firstTimeLaunch = async (key, defaultValue)  => {
    let value = await AsyncStorage.getItem(key);
    if(value === null) {
        AsyncStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue
    }
    return JSON.parse(value)
}
export default firstTimeLaunch