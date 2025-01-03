import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          navigation.replace('Profile');
        } else {
          navigation.replace('Login');
        }
      }, 2000); // Show splash for 2 seconds
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../util/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
