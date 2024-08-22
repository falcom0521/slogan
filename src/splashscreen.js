import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {
  const [status , setStatus] = useState(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('token status....' , token);
        const token =  AsyncStorage.getItem('authToken');
        setStatus(token)
        
        if (status != null) {
          // Token exists, navigate to HomeScreen
          navigation.navigate('Drawer');
        } else {
          // No token, navigate to RoleScreen
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        // Navigate to RoleScreen or handle error
      }
    };

    checkLoginStatus();
  }, [navigation]);

    
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Image
          source={require('../assets/logo.png')} // replace with your logo image path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Ensure the background image covers the entire screen
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%', // Adjust the size as needed
    height: undefined,
    aspectRatio: 1, // Maintain the aspect ratio of the logo
  },
});

export default SplashScreen;
