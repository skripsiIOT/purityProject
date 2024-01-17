import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUID = async(uid) => {
    try {
        await AsyncStorage.setItem('uid', uid);
    } catch (err) {
        console.log(err);
    }
} 

export const removeData  = async(uid) => {
    try {
        await AsyncStorage.removeItem(uid);
        return true;
    } catch (err) {
        return false;
    }
}