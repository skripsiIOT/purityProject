import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUID = async(uid) => {
    try {
        await AsyncStorage.setItem('uid', uid);
    } catch (err) {
        console.log(err);
    }
} 

export const setDeviceID = async(id) => {
    try {
        await AsyncStorage.setItem('deviceID', id);
    } catch (err) {
        console.log(err);
    }
} 

export const removeDataUID  = async(uid) => {
    try {
        await AsyncStorage.removeItem(uid);
        return true;
    } catch (err) {
        return false;
    }
}
export const removeDataDeviceID  = async(id) => {
    try {
        await AsyncStorage.removeItem(id);
        return true;
    } catch (err) {
        return false;
    }
}