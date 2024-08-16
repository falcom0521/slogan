import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import CustomAppBar from '../CustomAppBar';

const AboutUs = () => {
    let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold });

    if (!fontsLoaded) {
        return null; // You can return a fallback UI here if needed
    }

    return (
        <View style={styles.screenContainer}>
            <StatusBar backgroundColor={"#FFF"} barStyle="dark-content" />
            <CustomAppBar title="About Us" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>We combine technologies with human creativity.</Text>
                        </View>
                        <View>
                            <Text style={styles.descText}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>What we do</Text>
                        </View>
                        <View>
                            <Text style={styles.descText}>We are AddBloom and we’re deeply embedded in the mindset of the modern consumer, who places value in the mission and purpose of the brands they choose to love. Understanding every aspect of digital disruption and how buyers interact with products, services and brands is the core of our business.</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>Who we are</Text>
                        </View>
                        <View>
                            <Text style={styles.underline}>Creative Strategy</Text>
                        </View>
                        <View>
                            <Text style={styles.descText}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
                        </View>
                        <View>
                            <Text style={styles.underline}>Digital Strategy</Text>
                        </View>
                        <View>
                            <Text style={styles.descText}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  content: {
    marginTop: moderateScale(25),
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
  },
  headingContainer: {
    marginTop: moderateScale(10),
  },
  headingText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
  },
  descText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 15,
  },
  underline: {
    fontFamily: 'Poppins_300Light',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default AboutUs;
