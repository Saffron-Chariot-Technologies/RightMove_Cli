import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async ({value, key}: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e: any) {
    console.log({err: e.message});
  }
};

export const getStorageData = async (key: any) => {
  try {
    const data = await AsyncStorage.getItem(key);
    // @ts-ignore
    return JSON.parse(data);
  } catch (err: any) {
    console.log({err: err.message});
  }
};

export const logout = async () => {
  try {
    for (let [key, value] of Object.entries(keys)) {
      await AsyncStorage.removeItem(value);
    }
    console.log('async storage cleared');
  } catch (err: any) {
    console.log({err: err.message});
  }
};

export const keys = {
  userToken: '@storage_userToken',
};

