import AsyncStorage from '@react-native-async-storage/async-storage';

const storageToState = async (key, method) => {
    let value =  await AsyncStorage.getItem(key)
    method(value);
}
export default storageToState