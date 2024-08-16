import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
// import apiInstance from '../../Instance/api';
import CustomAppBar from '../CustomAppBar';
import { ScrollView } from 'react-native-gesture-handler';



const TermAndCondition = () => {
    let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

    if (!fontsLoaded) {
        return null; // You can return a fallback UI here if needed
      }
  return (
    <View style={styles.frstcontainer}>
      <ScrollView>
    <CustomAppBar title="Terms and Conditions" />
    <StatusBar backgroundColor={"#FFF"}/>

    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headingcontainer}>
            <Text style={styles.HeadingText}>Terms and Conditions Of Use</Text>
        </View>
        <View >
            <Text style={styles.DescText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
        </View>
      </View>
      <View style={styles.content}>
        
        <View >
            <Text style={styles.DescText}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.headingcontainer}>
            <Text style={styles.HeadingText}>Revisions to Terms & Conditions</Text>
        </View>
       
        <View >
        <Text style={styles.DescText}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
        </View>
        
      </View>
    </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    marginTop: moderateScale(25),
    marginLeft:moderateScale(20),
    marginRight:moderateScale(20)
  },
  headingcontainer:{
    marginTop:moderateScale(10),
  },
  HeadingText:{
    fontFamily: 'Poppins_500Medium',
    fontSize:20
  },
  DescText:{
    fontFamily:'Poppins_300Light',
    fontSize:16

  },
  Underline:{
    fontFamily:'Poppins_300Light',
    fontSize:15,
    textDecorationLine: 'underline',
    marginTop:10                

  },
frstcontainer:{
  backgroundColor:'white'
}

});

export default TermAndCondition;
