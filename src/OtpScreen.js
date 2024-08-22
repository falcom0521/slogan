import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import useOtp from "./hooks/useOtp";

const OtpScreen = ({ navigation ,route}) => {
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

  const [Otp1, onChangeOtp1] = useState('');
  const [Otp2, onChangeOtp2] = useState('');
  const [Otp3, onChangeOtp3] = useState('');
  const [Otp4, onChangeOtp4] = useState('');

  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const email = route?.params?.email || ''; // Check for email and provide a fallback
  

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  const handleOtpChange = (text, setOtp, nextRef) => {
    setOtp(text);
    if (text.length === 1 && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleresend = () =>[
    console.log('resend clicked')
  ]

  const otp = Otp1 + Otp2 + Otp3 + Otp4;

  const handleSubmit = async () => { // Add 'async' keyword here
    console.log('Entered OTP:', otp);
    setIsLoading(true);
    // Navigate to the next screen


    try {
      const data = {
        email: email,
        otp: otp,
      };
      const res = await useOtp(data);
      console.log("Register response:", res); // Log the entire response object for debugging
      if (res?.["status"] === 200) {
        navigation.navigate("NormalLogin"); // Navigate to the next screen after successful OTP verification
        
      } else {
        Alert.alert("Verification failed: ", res?.message);
      }

    } catch (error) {
      console.log("Error during OTP verification:", error);
      Alert.alert("Error", "OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.groupImage}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/Ellipse 8.png')}
            style={styles.ellipseImage}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/teenyicons_password-outline.png')}
            style={styles.teenyIconImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Otp Verification</Text>
        <Text style={styles.textSmall}>
          Enter the verification code we just sent you
        </Text>
        <Text style={styles.textSmall}>on your email address.</Text>
      </View>
      <View style={styles.Otp}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleOtpChange(text, onChangeOtp1, otp2Ref)}
          value={Otp1}
          placeholder="0"
          secureTextEntry={true}
          keyboardType='numeric'
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          ref={otp2Ref}
          onChangeText={(text) => handleOtpChange(text, onChangeOtp2, otp3Ref)}
          value={Otp2}
          placeholder="0"
          secureTextEntry={true}
          keyboardType='numeric'
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          ref={otp3Ref}
          onChangeText={(text) => handleOtpChange(text, onChangeOtp3, otp4Ref)}
          value={Otp3}
          placeholder="0"
          secureTextEntry={true}
          keyboardType='numeric'
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          ref={otp4Ref}
          onChangeText={(text) => handleOtpChange(text, onChangeOtp4, null)}
          value={Otp4}
          placeholder="0"
          secureTextEntry={true}
          keyboardType='numeric'
          maxLength={1}
        />
      </View>
      <View>
      <TouchableOpacity
        style={styles.registercontainer}
        onPress={handleresend} // Navigate to Register screen
      >
        <Text style={styles.test}>If you didn't recieve a code </Text>
        <Text style={styles.register}>Resend</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.buttonStyle} 
          onPress={handleSubmit}
          disabled={isLoading} // Disable button during loading
        >
          <Text style={styles.buttonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: moderateScale(20),
  },
  groupImage: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(63),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: moderateScale(10),
  },
  text: {
    fontSize: 25,
    marginBottom: moderateScale(5),
    fontFamily: 'Poppins_500Medium',
    textAlign: 'left',
  },
  textSmall: {
    fontSize: 15,
    paddingBottom: moderateScale(2),
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
  },
  Otp: {
    flexDirection: 'row',
    marginTop: moderateScale(37),
    paddingHorizontal: moderateScale(10),
  },
  input: {
    marginRight: moderateScale(10),
    height: 50,
    backgroundColor: '#F1F1F1',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    width: 40,
    fontSize: 25,
    textAlign: 'center',
    paddingHorizontal: moderateScale(5),
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
    paddingHorizontal: moderateScale(10),
  },
  imageContainer: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  ellipseImage: {
    alignSelf: 'center',
    width: moderateScale(127),
    height: moderateScale(127),
    marginTop: moderateScale(40),
  },
  teenyIconImage: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -25 },
      { translateY: -25 },
    ],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registercontainer: {
    flexDirection: 'row',
    marginTop: 60,
  },
  test: {
    fontFamily: 'Poppins_300Light',
  },
  register: {
    marginLeft: 5,
    fontFamily: 'Poppins_500Medium',
    color: '#B12341',
  },
});

export default OtpScreen;
