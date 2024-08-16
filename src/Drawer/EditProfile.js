import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import user from '../User';  // Import the user object from user.js
import { moderateScale } from 'react-native-size-matters';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomAppBar from '../CustomAppBar';

const EditProfile = ({ navigation }) => {
  // Load initial user data from user.js
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);

  // Function to choose an image from the gallery
  const chooseImageFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorMessage) {
        console.error('ImagePicker Error:', result.errorMessage);
        Alert.alert('Error', 'An error occurred while selecting the image.');
      } else if (result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        setProfileImage({ uri: selectedImageUri });
      }
    } catch (error) {
      console.error('Error while picking the image:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Function to handle the save action (for future API call)
  const handleSaveProfile = () => {
    const updatedProfile = {
      username,
      email,
      phone,
      gender,
      dob,
      profileImage,
    };

    // Here you would send the updated profile to an API
    console.log("Profile saved:", updatedProfile);

    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <Image
          source={profileImage}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={chooseImageFromGallery}>
          <Text style={styles.cameraText}>📷</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Full Name</Text>
          <TextInput
            style={styles.infoText}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <TextInput
            style={styles.infoText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <TextInput
            style={styles.infoText}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Gender</Text>
          <TextInput
            style={styles.infoText}
            value={gender}
            onChangeText={setGender}
          />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Date of Birth</Text>
          <TextInput
            style={styles.infoText}
            value={dob}
            onChangeText={setDob}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    marginTop: moderateScale(110),
  },
  image: {
    width: moderateScale(111),
    height: moderateScale(111),
    borderRadius: 55,
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#B12341',
    borderRadius: 20,
    padding: 8,
  },
  cameraText: {
    color: 'white',
    fontSize: 18,
  },
  infoContainer: {
    width: '90%',
    marginTop: moderateScale(30),
  },
  infoItem: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  infoLabel: {
    fontFamily: 'Poppins_300Light',
    fontSize: 12,
    color: '#555',
  },
  infoText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: moderateScale(30),
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#B12341',
    borderRadius: 50,
    width: moderateScale(211),
    height: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
  },
});

export default EditProfile;
