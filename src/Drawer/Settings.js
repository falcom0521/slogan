import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableHighlight, StatusBar } from 'react-native';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import user from '../User';  // Import the user object
import { moderateScale } from 'react-native-size-matters';
import CustomAppBar from '../CustomAppBar';

const Settings = ({ navigation }) => {
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <CustomAppBar title={'Profile'}/>
      <StatusBar backgroundColor={'white'}/>
    <View style={styles.container}>
      <Image
        source={user.profileImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.Username}>{user.username}</Text>
      <Text style={styles.desig}>{user.desig}</Text>
      
      
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.buttonStyle} 
          onPress={() => navigation.navigate('EditProfile')}
          underlayColor="#F0F0F0" // Adjust color as needed
        >
          <Text style={styles.buttonText}>Edit profile</Text>
        </TouchableHighlight>
        </View>

        <View>
        <View style={styles.gendername}>
            <Text style={styles.genderhead}>Email</Text>
            <Text style={styles.gendertext}>{user.email}</Text>
        </View>
        </View>

        <View>
        <View style={styles.gendername}>
            <Text style={styles.genderhead}>Phone number</Text>
            <Text style={styles.gendertext}>{user.phone}</Text>
        </View>
        </View>
        <View>
        <View style={styles.gendername}>
            <Text style={styles.genderhead}>Gender</Text>
            <Text style={styles.gendertext}>{user.gender}</Text>
        </View>
        </View>
        <View>
        <View style={styles.gendername}>
            <Text style={styles.genderhead}>Date of Birth</Text>
            <Text style={styles.gendertext}>{user.dob}</Text>
        </View>
        </View>
        </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:moderateScale(40),
    width: moderateScale(111),
    height: moderateScale(111),
  },
  text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    marginTop: 10,
  },
  Username: {
    fontFamily:'Poppins_600SemiBold',
    fontSize:25,
    marginTop:20,


  },
  desig:{
    fontFamily:'Poppins_300Light',
    fontSize:15,

  },
  buttonContainer: {
    marginTop: moderateScale(20),
    alignItems: 'center',
    marginBottom: moderateScale(40)
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: moderateScale(211),
    height: moderateScale(48),
    backgroundColor: "#B12341",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: 'Poppins_500Medium', // Choose one font weight here
  },
  gendername: {
    height: 72,
    backgroundColor: '#F1F1F1',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: moderateScale(10),
    width: 348,
    justifyContent: 'center', // Center text vertically
    alignItems: 'left', // Center text horizontally
    marginBottom: moderateScale(10),
  },
  gendertext: {
    fontSize: 16,
    fontFamily:'Poppins_500Medium',
    
  },
  genderhead: {
    fontFamily:'Poppins_300Light',
    fontSize:12,
  }
});

export default Settings;
