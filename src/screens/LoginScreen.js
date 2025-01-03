// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import {saveUserData} from '../util/storage';

// export default function LoginScreen({navigation}) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     configureGoogleSignIn();
//   }, []);

//   const configureGoogleSignIn = async () => {
//     try {
//       await GoogleSignin.configure({
//         webClientId:
//           '400445123620-pu0d1bic505719hv7ahib41bq7o44n1o.apps.googleusercontent.com', // Replace with your web client ID
//         offlineAccess: true,
//       });
//     } catch (error) {
//       console.error('Google SignIn Configuration Error:', error);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       setLoading(true);
//       await GoogleSignin.signOut();
//       await GoogleSignin.hasPlayServices();

//       const signInResult = await GoogleSignin.signIn();
//       const idToken = signInResult.data.idToken;

//       if (!idToken) {
//         throw new Error('No ID token present in sign in result');
//       }

//       const credential = auth.GoogleAuthProvider.credential(idToken);
//       const userCredential = await auth().signInWithCredential(credential);

//       // Save user data to AsyncStorage
//       const userData = {
//         uid: userCredential.user.uid,
//         email: userCredential.user.email,
//         displayName: userCredential.user.displayName,
//         photoURL: userCredential.user.photoURL,
//       };

//       await saveUserData(userData);
//       navigation.replace('Profile');
//     } catch (error) {
//       console.error('Detailed Google Sign In Error:', error);
//       Alert.alert(
//         'Sign In Error',
//         error.message || 'An unknown error occurred',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailLogin = async () => {
//     try {
//       setLoading(true);
//       if (email && password) {
//         const userCredential = await auth().signInWithEmailAndPassword(
//           email,
//           password,
//         );
//         navigation.replace('Profile');
//       } else {
//         Alert.alert('Error', 'Please fill in all fields');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Learn Kannada</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         editable={!loading}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         editable={!loading}
//       />
//       <TouchableOpacity
//         style={[styles.button, loading && styles.disabledButton]}
//         onPress={handleEmailLogin}
//         disabled={loading}>
//         <Text style={styles.buttonText}>
//           {loading ? 'Loading...' : 'Login with Email'}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[
//           styles.button,
//           styles.googleButton,
//           loading && styles.disabledButton,
//         ]}
//         onPress={handleGoogleLogin}
//         disabled={loading}>
//         <Text style={styles.buttonText}>
//           {loading ? 'Loading...' : 'Login with Google'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   googleButton: {
//     backgroundColor: '#DB4437',
//   },
//   disabledButton: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {saveUserData} from '../util/storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    try {
      await GoogleSignin.configure({
        webClientId:
          '400445123620-pu0d1bic505719hv7ahib41bq7o44n1o.apps.googleusercontent.com',
        offlineAccess: true,
      });
    } catch (error) {
      console.error('Google SignIn Configuration Error:', error);
      Alert.alert('Setup Error', 'Failed to configure Google Sign In');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();

      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data.idToken;

      if (!idToken) {
        throw new Error('No ID token present in sign in result');
      }

      const credential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(credential);

      // Save user data to AsyncStorage
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };

      await saveUserData(userData);
      navigation.replace('Profile');
    } catch (error) {
      console.error('Detailed Google Sign In Error:', error);
      Alert.alert(
        'Sign In Error',
        error.message || 'An unknown error occurred',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        email.trim(),
        password,
      );

      // Save basic user data
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || '',
        photoURL: userCredential.user.photoURL || '',
      };

      await saveUserData(userData);
      navigation.replace('Profile');
    } catch (error) {
      console.error('Email Login Error:', error);
      let errorMessage = 'Failed to sign in';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }

      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address first');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email.trim());
      Alert.alert(
        'Password Reset',
        'Password reset email has been sent. Please check your inbox.',
      );
    } catch (error) {
      console.error('Password Reset Error:', error);
      Alert.alert(
        'Error',
        'Failed to send password reset email. Please try again.',
      );
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradient}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Learn Kannada</Text>
              <Text style={styles.subtitle}>Welcome back!</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputWrapper}>
                <Icon name="email" size={20} color="#4c669f" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color="#4c669f" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Icon
                    name={secure ? 'eye-off' : 'eye'}
                    size={20}
                    color="#4c669f"
                  />
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.button, styles.emailButton]}
                onPress={handleEmailLogin}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login with Email</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Login Button */}
              <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={handleGoogleLogin}
                disabled={loading}>
                <Icon
                  name="google"
                  size={20}
                  color="#fff"
                  style={styles.googleIcon}
                />
                <Text style={styles.buttonText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Footer Links */}
              <View style={styles.footerLinks}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.linkText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
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
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('3%'),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('1%'),
  },
  subtitle: {
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
  button: {
    flexDirection: 'row',
    height: hp('6%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  emailButton: {
    backgroundColor: '#4c669f',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  googleIcon: {
    marginRight: wp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: wp('3%'),
    color: '#666',
    fontSize: wp('3.5%'),
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  linkText: {
    color: '#4c669f',
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
});
