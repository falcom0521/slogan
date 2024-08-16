import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
// import apiInstance from '../../Instance/api';

const ForgotPassword = ({ navigation }) => { // Accept navigation prop
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');

  if (!fontsLoaded) {
    return null; // You can return a fallback UI here if needed
  }

  // const fun = async () => {

  //     try {

  //       const res = await apiInstance
        
  //     } catch (error) {
        
  //     }


  // }

  return (
    <View style={styles.container}>
      <View style={styles.groupImage}>
      <View style={styles.imageContainer}>
        {/* Ellipse image (background) */}
        <Image
          source={require('../assets/Ellipse 8.png')}
          style={styles.ellipseImage}
          resizeMode="contain"
        />

        {/* Teenyicons image (overlay) */}
        <Image
          source={require('../assets/teenyicons_password-outline.png')}
          style={styles.teenyIconImage}
          resizeMode="contain"
        />
      </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Forgot Password ?</Text>
        <Text style={styles.textSmall}>
        Enter your registered email below to receive </Text>
        <Text style={styles.textSmall}>password reset instruction.</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter you Email"
        />
       
      </View>
     
      <View style={styles.buttonContainer}>
        <TouchableHighlight 
          style={styles.buttonStyle} 
          onPress={() => navigation.navigate('OtpScreen')}
          underlayColor="#F0F0F0" // Adjust color as needed
        >
          <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableHighlight>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center content horizontally
    padding: moderateScale(20),
    
  },
  groupImage: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(63),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: moderateScale(60), // Adjust size as needed
    height: moderateScale(60), // Adjust size as needed
    resizeMode:"contain",
  },
  textContainer: {
    alignItems: 'center', // Align text container to the left
    justifyContent:'center',
    width: '100%', // Make sure text container takes up full width
    paddingHorizontal: moderateScale(10), // Add horizontal padding
  },
  text: {
    fontSize: 25,
    marginBottom: moderateScale(5),
    fontFamily: 'Poppins_500Medium',
    textAlign: 'left', // Align text to the left
  },
  textSmall: {
    fontSize: 15,
    paddingBottom: moderateScale(2),
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
    width: moderateScale(290),
    height: moderateScale(64),
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
  },
  imageContainer: {
    width: 200,  // Adjust width as needed
    height: 200, // Adjust height as needed
    position: 'relative', // Position container relatively
  },
  ellipseImage: {
    alignSelf:'center',
    width: moderateScale(127),
    height: moderateScale(127),
    marginTop:moderateScale(40),
  },
  teenyIconImage: {
    position: 'absolute',
    width: 60,  // Adjust width as needed
    height: 60, // Adjust height as needed
    top: '50%', // Adjust vertical position
    left: '50%', // Adjust horizontal position
    transform: [
      { translateX: -25 }, // Center image horizontally
      { translateY: -25 }, // Center image vertically
    ],
  },
});

export default ForgotPassword;
