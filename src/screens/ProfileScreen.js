import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {saveUserData, getUserData} from '../utils/storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  createOrUpdateUserProfile,
  fetchUserProfile,
  updateProfileFields,
  updateLanguageProgress,
} from '../util/firestoreService';

export default function ProfileScreen({navigation}) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [language, setLanguage] = useState('Beginner');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);

      // Fetch profile data from Firestore
      const profileData = await fetchUserProfile();

      if (profileData) {
        setUserData(profileData);
        setName(profileData.name || '');
        setPhoneNumber(profileData.phoneNumber || '');
        setLanguage(profileData.language || 'Beginner');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    try {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }

      setLoading(true);

      // Prepare user data
      const profileData = {
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        language,
        // Add any additional fields you want to store
      };

      // Update profile in Firestore
      await createOrUpdateUserProfile(profileData);

      // If language level changed, update progress
      if (userData?.language !== language) {
        await updateLanguageProgress(language, 0); // Reset progress for new level
      }

      Alert.alert('Success', 'Profile updated successfully!');
      await loadUserProfile(); // Reload the profile data

      navigation.replace('Home', {username: name.trim()});
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        // Load from AsyncStorage
        const savedData = await AsyncStorage.getItem('userData');
        let parsedData = savedData ? JSON.parse(savedData) : null;

        // Load additional data from Firestore
        const userDoc = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .get();

        const firestoreData = userDoc.data() || {};

        // Merge data from all sources
        const combinedData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          ...parsedData,
          ...firestoreData,
        };

        setUserData(combinedData);
        setName(combinedData.name || currentUser.displayName || '');
        setPhoneNumber(combinedData.phoneNumber || '');
        setLanguage(combinedData.language || 'Beginner');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            try {
              setLoading(true);
              await AsyncStorage.clear();
              await auth().signOut();
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', error.message);
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4c669f" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {userData?.photoURL ? (
                <Image
                  source={{uri: userData.photoURL}}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Icon name="account" size={40} color="#fff" />
                </View>
              )}
            </View>
            <Text style={styles.emailText}>{userData?.email}</Text>
          </View>

          {/* Profile Form */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Profile Information</Text>

            {/* Name Input */}
            <View style={styles.inputWrapper}>
              <Icon name="account" size={20} color="#4c669f" />
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>

            {/* Phone Input */}
            <View style={styles.inputWrapper}>
              <Icon name="phone" size={20} color="#4c669f" />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#666"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>

            {/* Language Level */}
            <View style={styles.levelContainer}>
              <Text style={styles.levelTitle}>Kannada Level:</Text>
              <View style={styles.levelButtons}>
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelButton,
                      language === level && styles.levelButtonActive,
                    ]}
                    onPress={() => setLanguage(level)}>
                    <Text
                      style={[
                        styles.levelButtonText,
                        language === level && styles.levelButtonTextActive,
                      ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.disabledButton]}
              onPress={handleCreateProfile}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Icon name="content-save" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Update Profile</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Sign Out Button */}
            <TouchableOpacity
              style={[styles.button, styles.signOutButton]}
              onPress={handleSignOut}
              disabled={loading}>
              <Icon name="logout" size={20} color="#fff" />
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('3%'),
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: hp('4%'),
  },
  avatarContainer: {
    marginBottom: hp('2%'),
  },
  avatar: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  emailText: {
    fontSize: wp('4%'),
    color: '#fff',
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('2%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: wp('4%'),
    color: '#333',
  },
  levelContainer: {
    marginVertical: hp('2%'),
  },
  levelTitle: {
    fontSize: wp('4%'),
    color: '#333',
    marginBottom: hp('1%'),
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  levelButton: {
    flex: 1,
    paddingVertical: hp('1%'),
    marginHorizontal: wp('1%'),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4c669f',
    alignItems: 'center',
  },
  levelButtonActive: {
    backgroundColor: '#4c669f',
  },
  levelButtonText: {
    color: '#4c669f',
    fontSize: wp('3.5%'),
  },
  levelButtonTextActive: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    height: hp('6%'),
    backgroundColor: '#4c669f',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
});
