import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';

const CustomAppBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/logoappbar.png')} style={styles.logo} />
        </TouchableOpacity>
         <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff', // Ensure SafeAreaView has the same background as the app bar
  },
  appBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff', // App bar background color
    paddingHorizontal: 15,
    elevation: 3, // Shadow for Android
    shadowOpacity: 0.1, // Shadow for iOS
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 12.5,
    height: 25,
    resizeMode: 'contain',
  },
  logo: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
    paddingLeft:30
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#000', // Title text color
    fontFamily: 'Poppins_500Medium', // Use your custom font
    marginLeft: moderateScale(-80),
  },
});

export default CustomAppBar;
