import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import useForgot from './hooks/UseForgot';

const ForgotPassword = ({ navigation }) => {
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!fontsLoaded) {
    return null; // You can return a fallback UI here if needed
  }

  const handleSubmit = async () => {
    setIsLoading(true);
  
    try {
      const data = { email };
      const res = await useForgot(data);
  
      if (res?.status === 200) {
        navigation.navigate("OtpForgotScreen", { email: email });
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
        <Text style={styles.text}>Forgot Password?</Text>
        <Text style={styles.textSmall}>
          Enter your registered email below to receive password reset instructions.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={handleSubmit}
          disabled={isLoading}
          underlayColor="#F0F0F0"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>UPDATE</Text>
          )}
        </TouchableHighlight>
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
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 15,
    fontFamily: 'Poppins_300Light',
    textAlign: 'center',
    paddingBottom: moderateScale(2),
  },
  input: {
    height: 50,
    backgroundColor: '#F1F1F1',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: moderateScale(37),
    paddingHorizontal: moderateScale(10),
    width: 308,
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
    fontFamily: 'Poppins_500Medium',
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
      { translateX: -30 },
      { translateY: -30 },
    ],
  },
});

export default ForgotPassword;
