import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import CustomAppBar from './CustomAppBar';
import Slogans from './Slogans';
import { moderateScale } from 'react-native-size-matters';

const SloganScreen = ({ navigation }) => {
  // Sample data for slogans
  const slogansData = [
    { Username: 'Ajay', sloganText: 'This is a slogan for an image', imageUrl: require('../assets/Ellipse 7.png'), id: 1 },
    // Add more slogans here if needed with unique ids
  ];

  const handlePress = () => {
    Alert.alert("Success", "You have successfully added the slogan");
  };

  return (
    <View style={styles.container}>
      <CustomAppBar title={'Slogans'} />
      <ScrollView style={styles.scrollView}>
        {slogansData.map((item) => (
          <Slogans
            key={item.id}  // Assign a unique key to each item
            Username={item.Username}
            sloganText={item.sloganText}
            imageUrl={item.imageUrl}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your text"
        />
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.inputImageContainer}>
            <Image
              source={require('../assets/input.png')}
              style={styles.enter}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    margin: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    fontSize: 20,
    paddingHorizontal: moderateScale(10),
    width: moderateScale(270), // Adjusted width for better alignment
  },
  inputImageContainer: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#B12341',
    height: 40,
    width: 40,
    backgroundColor: '#B12341',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
  },
  enter: {
    height: 20,
    width: 20,
  },
});

export default SloganScreen;
