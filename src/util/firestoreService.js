// utils/firestoreService.js

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Collection references
const USERS_COLLECTION = 'users';
const LANGUAGE_PROGRESS_COLLECTION = 'languageProgress';

// User profile operations
export const createOrUpdateUserProfile = async userData => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    const userRef = firestore().collection(USERS_COLLECTION).doc(userId);

    // Prepare user data with timestamps
    const userDataToSave = {
      ...userData,
      updatedAt: firestore.FieldValue.serverTimestamp(),
      lastLoginAt: firestore.FieldValue.serverTimestamp(),
    };

    // If it's a new user, add createdAt
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      userDataToSave.createdAt = firestore.FieldValue.serverTimestamp();
    }

    // Update user profile
    await userRef.set(userDataToSave, {merge: true});

    return userDataToSave;
  } catch (error) {
    console.error('Firestore Error:', error);
    throw error;
  }
};

// Fetch user profile data
export const fetchUserProfile = async () => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    const userDoc = await firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
      .get();

    return userDoc.exists ? userDoc.data() : null;
  } catch (error) {
    console.error('Firestore Error:', error);
    throw error;
  }
};

// Update specific profile fields
export const updateProfileFields = async fields => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    await firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
      .update({
        ...fields,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error('Firestore Error:', error);
    throw error;
  }
};

// Track language progress
export const updateLanguageProgress = async (level, score) => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    const progressRef = firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection(LANGUAGE_PROGRESS_COLLECTION)
      .doc('current');

    await progressRef.set(
      {
        level,
        score,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    );
  } catch (error) {
    console.error('Firestore Error:', error);
    throw error;
  }
};

export const updateUserXP = async xpEarned => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    const userRef = firestore().collection(USERS_COLLECTION).doc(userId);

    await firestore().runTransaction(async transaction => {
      const userDoc = await transaction.get(userRef);
      const currentXP = userDoc.data()?.totalXP || 0;
      const dailyXP = userDoc.data()?.dailyXP || 0;

      transaction.update(userRef, {
        totalXP: currentXP + xpEarned,
        dailyXP: dailyXP + xpEarned,
        lastXPUpdate: firestore.FieldValue.serverTimestamp(),
      });
    });
  } catch (error) {
    console.error('Firestore Error:', error);
    throw error;
  }
};

export const updateLessonProgress = async (lessonId, progressData) => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    const progressRef = firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection('lessonProgress')
      .doc(lessonId);

    await progressRef.set(
      {
        ...progressData,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    );
  } catch (error) {
    console.error('Firestore Error:', error);
    throw error;
  }
};
