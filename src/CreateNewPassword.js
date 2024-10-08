import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Usenewpas from './hooks/Usenewpas';

const CreateNewPassword = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });
  const [isLoading, setIsLoading] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const email = route?.params?.email || ''; // Fallback for email

  const handlePassword = async () => {
    if (password1 !== password2) {
      Alert.alert('Password Mismatch', 'The passwords you entered do not match. Please try again.');
      return;
    }

    setIsLoading(true);
    const data = {
      email: email,
      password: password1,
      c_password: password2,
    };

    try {
      const res = await Usenewpas(data); // Assuming `Usenewpas` handles the API call
      if (res?.status === 200) {
        navigation.navigate("NormalLogin"); // Navigate to the 'NormalLogin' screen
      } else {
        Alert.alert("Verification failed", res?.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during password change:", error.response?.data || error.message);
      Alert.alert("Error", "Password change failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>; // Fallback UI while fonts are loading
  }

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
        <Text style={styles.text}>Create New Password</Text>
        <Text style={styles.textSmall}>
          Your new password must be different from
        </Text>
        <Text style={styles.textSmall}>previously used passwords.</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setPassword1}
          value={password1}
          placeholder="Enter New Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input2}
          onChangeText={setPassword2}
          value={password2}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handlePassword}
          disabled={isLoading} // Disable button while loading
        >
          <Text style={styles.buttonText}>CREATE</Text>
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
  input: {
    height: 50,
    backgroundColor: '#F1F1F1',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: moderateScale(37),
    paddingHorizontal: moderateScale(10),
    width: 308,
    fontSize: 16,
  },
  input2: {
    height: 50,
    backgroundColor: '#F1F1F1',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: moderateScale(7),
    paddingHorizontal: moderateScale(10),
    width: 308,
    fontSize: 16,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default CreateNewPassword;
