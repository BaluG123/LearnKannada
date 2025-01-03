// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const StorageKeys = {
//   USER_DATA: 'userData',
//   AUTH_TOKEN: 'authToken',
// };

// export const saveUserData = async userData => {
//   try {
//     await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(userData));
//   } catch (error) {
//     console.error('Error saving user data:', error);
//   }
// };

// export const getUserData = async () => {
//   try {
//     const userData = await AsyncStorage.getItem(StorageKeys.USER_DATA);
//     return userData ? JSON.parse(userData) : null;
//   } catch (error) {
//     console.error('Error getting user data:', error);
//     return null;
//   }
// };

import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageKeys = {
  USER_DATA: 'userData',
  AUTH_TOKEN: 'authToken',
};

export const saveUserData = async userData => {
  try {
    await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(StorageKeys.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};
