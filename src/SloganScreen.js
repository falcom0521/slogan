import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Image, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import CustomAppBar from './CustomAppBar';
import { moderateScale } from 'react-native-size-matters';
import UseSlogan from './hooks/UseSlogan'; // Import the hook
import { baseURLCreator } from "./Instance/url";
import useAddSlogan from './hooks/useAddSlogan';
import { BlurView } from "expo-blur";


const SloganScreen = ({ navigation, route }) => {
  const postId = route?.params?.postId || ''; // Correctly access postId
  const hasWon = route?.params?.hasWon || false; // Get the winning status

  const { posts, error } = UseSlogan(postId); // Use the custom hook to fetch slogans
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(''); // Initialize text state

  const handlePress = async () => {
    console.log('Entered Slogan:', text);
    setIsLoading(true);

    try {
      const data = {
        post_id: postId,
        slogan: text,
      };
      // Ensure useAddSlogan is used correctly (check if it's a hook or a function)
      const res = await useAddSlogan(data);
      console.log("Slogan Add Response:", res); // Log the entire response object for debugging

      if (res?.message === "Slogan Created") {
        Alert.alert("Slogan successfully added");
              setText(''); // Clear the input field

      } else {
        Alert.alert("Slogan failed", res?.message || "Unknown error");
      }
    } catch (error) {
      console.log("Slogan adding failed", error);
      Alert.alert("Slogan adding failed", error.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#B12341" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load slogans: {error.message}</Text>
      </View>
    );
  }
  const sortedPosts = posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <View style={styles.container}>
      <CustomAppBar title={'Slogans'} />
      <ScrollView style={styles.scrollView}>
        {sortedPosts.map((post) => (
          
          <View style={styles.containerslogan}>
                    <View style={styles.sloganContainer}>
                <View style={styles.head}>
                  <Image
                    style={styles.logo}
                    source={post.creator.image ? { uri: `${baseURLCreator}${post.creator.image}` } : require('../assets/Group 2.png')}// Use imageUrl prop
                  />
                  <Text style={styles.usernameText}>{`${post.creator.first_name} ${post.creator.last_name}`}</Text>
                </View>
                {hasWon ? (
                // If hasWon is true, render the slogan text without BlurView
                <Text style={styles.sloganText}>{post.slogan}</Text>
              ) : (
                // Otherwise, render the slogan text with BlurView
                <BlurView intensity={100} tint="dark" style={styles.blurContainer}>
                  <Text style={styles.sloganText}>{post.slogan}</Text>
                </BlurView>
              )}
              </View>
          </View>
        ))}
      </ScrollView>
      {!hasWon && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your text"
            value={text} // Add value prop to bind the text state
            onChangeText={(text) => setText(text)} // Correct onChangeText handler
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  noSlogansText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: '#999',
    marginTop: moderateScale(20),
  },
  sloganContainer: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  blurContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    height: 35,
    width: 35,
    marginRight: 12,
    borderRadius: 50,
  },
  usernameText: {
    fontSize: 20,
    color: "#333",
  },
  sloganText: {
    fontSize: 18,
    color: "#666",
    marginRight: moderateScale(10),
  },
  containerslogan: {
    marginTop: moderateScale(10),
    padding: 5,
    backgroundColor: "#fff",
  },
});

export default SloganScreen;
