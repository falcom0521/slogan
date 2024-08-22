import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import useOtp from "./hooks/useOtp";
import useForgot from "./hooks/UseForgot";

const OtpForgotScreen = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = Array.from({ length: 4 }, () => useRef(null));
  const email = route?.params?.email || ''; // Fallback for email

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleOtpChange = (text, index) => {
    if (text.length === 1 && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const data = { email };
      const res = await useForgot(data);

      if (res?.status === 200) {
        Alert.alert("Success", "OTP has been resent to your email.");
      } else {
        Alert.alert("Reset failed", res?.message || "Invalid email address.");
      }
    } catch (error) {
      console.error("Error during reset:", error);
      Alert.alert("Error", "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
    setIsLoading(true);
  
    const data = {
      email: email, // Replace with the actual email string
      otp: enteredOtp, // The OTP should be a string, which it is in this case
    };
  
    console.log("Data being sent for OTP verification:", data);
  
    try {
      const res = await useOtp(data); // Assuming `useOtp` handles the API call
      if (res?.status === 200) {
        navigation.navigate("CreateNewPassword",  { email: email });
        console.log('passing email:',email)
      } else {
        Alert.alert("Verification failed", res?.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.response?.data || error.message);
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
          Enter the verification code we just sent you on your email address.
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
            ref={otpRefs[index]}
            onChangeText={(text) => handleOtpChange(text, index)}
            value={value}
            placeholder="0"
            secureTextEntry={true}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.infoText}>If you didn't receive a code </Text>
        <TouchableOpacity onPress={handleResend} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#B12341" />
          ) : (
            <Text style={styles.resendText}>Resend</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSubmit}
          disabled={isLoading}
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
    textAlign: 'center',
  },
  otpContainer: {
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
  resendContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(60),
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Poppins_300Light',
  },
  resendText: {
    marginLeft: 5,
    fontFamily: 'Poppins_500Medium',
    color: '#B12341',
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
});

export default OtpForgotScreen;
