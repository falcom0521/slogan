import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import useLogin from './hooks/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NormalLoginScreen = ({ navigation }) => { // Accept navigation prop
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  if (!fontsLoaded) {
    return null; // You can return a fallback UI here if needed
  }
  const handleSubmit = async () => {
    setIsLoading(true);
  
    try {
      const data = {
        email: text,
        password: number,
      };
      const res = await useLogin(data);
      console.log("Login response:", res);
  
      // Adjust the status code check according to your API response structure
      if (res?.['status code'] === 200) {
        await AsyncStorage.setItem('authToken', res.success.token);
        navigation.navigate("Drawer");
      } else {
        Alert.alert("Login failed", res?.message || "You have entered invalid credentials.");
      }
    } catch (error) {
      console.log("Error during login:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.groupImage}>
        <Image
          source={require('../assets/Group 1.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Login</Text>
        <Text style={styles.textSmall}>
          Please enter the details below to continue
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Username"
        />
        <TextInput
          style={styles.inputpass}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Password"
          secureTextEntry={true} // Secure text entry for password
        />
      </View>
      <View style={styles.forgot}>
        <Text style={styles.forgotText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight 
          style={styles.buttonStyle} 
          onPress={handleSubmit}
          disabled={isLoading}
          underlayColor="#F0F0F0" // Adjust color as needed
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
      <TouchableOpacity
        style={styles.registercontainer}
        onPress={() => navigation.navigate('NormalRegisterScreen')} // Navigate to Register screen
      >
        <Text style={styles.test}>Don’t have an account? </Text>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
    padding: moderateScale(20),
    backgroundColor:'white',
  },
  groupImage: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(63),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(200), // Adjust size as needed
    height: moderateScale(200), // Adjust size as needed
  },
  textContainer: {
    alignItems: 'flex-start', // Align text container to the left
    width: '100%', // Make sure text container takes up full width
    paddingHorizontal: moderateScale(20), // Add horizontal padding
  },
  text: {
    fontSize: 25,
    marginBottom: moderateScale(5),
    fontFamily: "Poppins_600SemiBold",
    textAlign: 'left', // Align text to the left
  },
  textSmall: {
    fontSize: 15,
    paddingBottom: moderateScale(7),
    fontFamily: 'Poppins_300Light',
    textAlign: 'left', // Align text to the left
  },
  input: {
    height: 50,
    backgroundColor: '#F1F1F1', // Background color for TextInput
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: moderateScale(37),
    paddingHorizontal: moderateScale(10),
    width: 308,
  },
  inputpass: {
    paddingTop: moderateScale(8),
    height: 50, // Fixed height for consistency
    backgroundColor: '#F1F1F1', // Background color for TextInput
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    width: 308,
  },
  forgot: {
    width: '100%', // Take full width to align text correctly
    alignItems: 'flex-end', // Align content to the right
    marginTop: moderateScale(13),
  },
  forgotText: {
    color: '#B12341', // Color for the forgot password text
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
  },
  buttonContainer: {
    marginTop: moderateScale(30),
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: moderateScale(307),
    height: moderateScale(68),
    backgroundColor: "#B12341",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: 'Poppins_500Medium', // Choose one font weight here
  },
  registercontainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  test: {
    fontFamily: 'Poppins_300Light',
  },
  register: {
    marginLeft: 5,
    fontFamily: 'Poppins_500Medium',
    color: '#B12341',
  }
});

export default NormalLoginScreen;
