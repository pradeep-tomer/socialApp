// This file contains common functions
// related to Local storage

import AsyncStorage from '@react-native-async-storage/async-storage';

// save data into local storage
export async function saveData(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getData(key: string) {
  let val: string | null = '';
  val = await AsyncStorage.getItem(key);

  try {
    if (val != null || val != '') {
      return val;
    } else {
      return false;
    }
  } catch (error) {
    console.log('error', error);
  }
}
// remove data from local storage
export async function removeData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}
