import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, StatusBar } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync(); // Prevent auto-hide while fonts are loading

const LoginScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // You can return a fallback UI here if needed
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff'/>
      <View style={styles.top} />

      <View style={styles.textStyle}>
        <Text style={styles.text}>Login</Text>
        <Text style={[styles.textSmall]}>
          Choose which user you are
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableHighlight 
          style={styles.buttonStyle} 
          onPress={() => navigation.navigate('CompanyLogin')}
          underlayColor="#F0F0F0" // Adjust color as needed
        >
          <Text style={styles.buttonText}>Company</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.buttonStyle} 
          onPress={() => navigation.navigate('NormalLogin')}
          underlayColor="#F0F0F0" // Adjust color as needed
        >
          <Text style={styles.buttonText}>Normal</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: moderateScale(20),
    backgroundColor:'white'
  },
  top: {
    height: verticalScale(359),
  },
  text: {
    fontSize: 25,
    marginBottom: moderateScale(5),
    fontFamily: "Poppins_600SemiBold",
  },
  textStyle: {
    marginBottom: moderateScale(20),
  },
  textSmall: {
    fontSize: 15,
    paddingBottom: moderateScale(20),
    fontFamily: 'Poppins_300Light',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    
    borderRadius: 50,
    width: moderateScale(307),
    height: moderateScale(68),
    backgroundColor: "transparent",
    borderColor: "#B12341",
    borderWidth: 2,
  },
  buttonText: {
    color: "#B12341",
    fontSize: 18,
    fontFamily: 'Poppins_500Medium', // Choose one font weight here
  }
});

export default LoginScreen;
