import AsyncStorage from '@react-native-async-storage/async-storage';

const storageToParsedState = async (key, method) => {
    let value =  await AsyncStorage.getItem(key)
    method(JSON.parse(value));
}
export default storageToParsedState