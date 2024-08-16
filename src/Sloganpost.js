import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const SloganPost = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.sloganContainer}>
          <View style={styles.sloganCompany}>
            <Image
              source={require('../assets/companylogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>ADDBLOOM</Text>
            </View>
            <View style={styles.calenderContainer}>
              <Image
                source={require('../assets/Group.png')}
                style={styles.calender}
                resizeMode="contain"
              />
              <View>
                <Text>End Date</Text>
                <Text>21-05-2024</Text>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            <Image
              source={require('../assets/Rectangle 23.png')}
              style={styles.post}
              resizeMode="contain"
            />
          </View>
          <View >
            <Text style={styles.desc}>Welcoming slognas for this post , the best creative slogan wouldbe awarded . enter your slogans !!!</Text>
          </View>
          
            <View style={styles.slogansNumber}>
              <Text style={styles.number}>51</Text> 
              <Text style={styles.slogans}>Slogans</Text> 
            </View>
          
          <TouchableHighlight 
            style={styles.touchableHighlight}
            onPress={() => navigation.navigate('SloganScreen')} // Use the route name here
            underlayColor="#DDDDDD" // Optional: color for the touch feedback
          >
          <View>
          <View style={styles.slogan}>
            <Image source={require('../assets/Vector.png')}></Image>
            <Text style={styles.add}>ADD SLOGAN</Text>
          </View>
        </View>
          </TouchableHighlight>
        </View>
        

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  sloganContainer: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fff',
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 8,
  },
  sloganCompany: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 45,
    width: 45,
    marginRight: 12,
  },
  usernameContainer: {
    flex: 1,
    marginLeft: 12,
  },
  calenderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calender: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  usernameText: {
    fontSize: 24,
    color: '#333',
  },
  sloganText: {
    fontSize: 18,
    color: '#666',
  },
  postContainer: {
    height: moderateScale(200),
    width: '100%',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  post: {
    height: '100%',
    width: '100%',
    borderWidth: 0,
    resizeMode: 'contain',
  },
  slogansNumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontSize: 24,
    padding: 5,
  },
  slogans: {
    fontSize: 15,
  },
  touchableHighlight: {
    // Optional: Add style if needed for the touchable highlight area
  },
  desc:{
    fontSize:15,
  },
  add:{
    fontSize:16,
    margin:10,
  },
  slogan:{
    flexDirection:'row',
    marginTop:20,
    alignItems:'center',
    margin:10
  }
});

export default SloganPost;
