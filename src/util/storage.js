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

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const StorageKeys = {
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
  LESSON_PROGRESS: 'lessonProgress', // Add this new key
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

// Add these new methods
export const saveLessonProgress = async (lessonId, progressData) => {
  try {
    // Get existing progress
    const existingProgress = await AsyncStorage.getItem(
      StorageKeys.LESSON_PROGRESS,
    );
    const progressMap = existingProgress ? JSON.parse(existingProgress) : {};

    // Update progress for specific lesson
    progressMap[lessonId] = progressData;

    // Save back to storage
    await AsyncStorage.setItem(
      StorageKeys.LESSON_PROGRESS,
      JSON.stringify(progressMap),
    );
  } catch (error) {
    console.error('Error saving lesson progress:', error);
  }
};

export const getLessonProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem(StorageKeys.LESSON_PROGRESS);
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error getting lesson progress:', error);
    return {};
  }
};
