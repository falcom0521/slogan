import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";
import { baseURL, baseURLCompany, baseURLCreator } from "./Instance/url";
import { moderateScale } from "react-native-size-matters";
import usePost from "./hooks/UsePost"; // Corrected the import path

const SloganPost = ({ navigation }) => {
  const { posts, isLoading, error } = usePost();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    Alert.alert("Error", "Failed to load posts. Please try again.");
    return null; // Return early if there's an error
  }

  // Get the current date
  const currentDate = new Date();

  // Filter and sort the posts
  const sortedPosts = posts
    .filter((post) => new Date(post.end_date) >= currentDate) // Filter posts with end_date greater than or equal to the current date
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by nearest created date first

  const expiredPosts = posts
    .filter((post) => new Date(post.end_date) < currentDate) // Filter posts with end_date less than the current date
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by nearest created date first

  const allPosts = [...sortedPosts, ...expiredPosts]; // Combine the sorted posts with unexpired end dates first, followed by expired posts

  return (
    <ScrollView style={styles.container}>
      {allPosts.map((post) => (
        <View key={post.id} style={styles.sloganContainer}>
          <View style={styles.sloganCompany}>
            <Image
              source={
                post.company.image !== null && post.company.image !== ""
                ? { uri: `${baseURLCompany}${post.company.image}` }
                : require("../assets/Group 2.png")
                
              }
              // {...console.log("Company Image:", post.company.image)}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>
                {post.company.company_name}
              </Text>
            </View>
          </View>

          <View style={styles.calendercontainerc}>
            <View style={styles.calenderContainer}>
              <Image
                source={require("../assets/Group.png")}
                style={styles.calender}
                resizeMode="contain"
              />
              <View>
                <Text>Created Date</Text>
                <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
              </View>
            </View>
            <View style={styles.calenderContainer}>
              <Image
                source={require("../assets/Group.png")}
                style={styles.calender}
                resizeMode="contain"
              />
              <View>
                <Text>End Date</Text>
                <Text>{new Date(post.end_date).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>

          <View style={styles.postContainer}>
            <Image
              source={
                post.image
                  ? { uri: `${baseURL}${post.image}` }
                  : require("../assets/Rectangle 23.png")
              }
              style={styles.post}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text style={styles.desc}>{post.content}</Text>
          </View>
          <View style={styles.slogansNumber}>
            <Text style={styles.number}>{post.slogans_count}</Text>
            <Text style={styles.slogans}>Slogans</Text>
          </View>
          {post.win_slogan ? (
            <View style={styles.creator}>
              
              <View style={styles.creator_name}>
                <Image
                  source={
                    post.win_slogan.user.creator.image
                      ? {
                          uri: `${baseURLCreator}${post.win_slogan.user.creator.image}`,
                        }
                      : require("../assets/Rectangle 23.png")
                  }
                  style={styles.creatorImage}
                  resizeMode="contain"
                />
                <Text style={styles.creatorText}>
                  {post.win_slogan.user.creator.first_name}{" "}
                  {post.win_slogan.user.creator.last_name}
                </Text>
              </View>
              <View style={styles.creatorText}>
              <TouchableHighlight
              style={styles.touchableHighlight}
              onPress={() => navigation.navigate("SloganScreen",{ postId: post.id, hasWon: !!post.win_slogan  })}
              underlayColor="#DDDDDD"
            >
                <Text style={styles.winnerslogan}>
                  {post.win_slogan.slogan}
                </Text>
                </TouchableHighlight>
              </View>
            </View>
          ) : new Date(post.end_date) < new Date() ? (
            <TouchableHighlight
            style={styles.touchableHighlight}
            onPress={() => navigation.navigate("SloganScreen", { postId: post.id, hasWon: !!post.win_slogan!== null   })}
            underlayColor="#DDDDDD"
          >
            <View style={styles.noWinningSlogancontainer}>
              <Text style={styles.noWinningSlogan}>No winning slogan</Text>
            </View>
          </TouchableHighlight>
          
          ) : (
            <TouchableHighlight
              style={styles.touchableHighlight}
              onPress={() => navigation.navigate("SloganScreen",{ postId: post.id })}
              underlayColor="#DDDDDD"
            >
              <View style={styles.slogan}>
                <Image
                  style={styles.sloganpenc}
                  source={require("../assets/Vector.png")}
                />
                <Text style={styles.add}>ADD SLOGAN</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    flex: 1,
    marginBottom:moderateScale(10)

  },
  sloganContainer: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#fff",
    width: "95%", // Use a percentage to give more room for shadow to appear
    alignSelf: "center", // Center the container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 }, // Increase height slightly to make shadow more prominent
    shadowOpacity: 0.3, // Increase opacity for more visible shadow
    shadowRadius: 8, // Increase radius for a larger shadow spread
    elevation: 8, // Ensure elevation is set for Android shadow
    marginVertical: 8,
  },

  sloganCompany: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:moderateScale(10)
  },
  logo: {
    height: moderateScale(30),
    width: moderateScale(30),
    marginRight:moderateScale(10),
  },
  usernameContainer: {
    flex: 1,
    marginLeft: 2,
  },
  calenderContainer: {
    flexDirection: "row",
    alignItems: "center",
    // padding:20,
    paddingEnd: moderateScale(10),
  },
  calendercontainerc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calender: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  usernameText: {
    fontSize: 16,
    color: "#333",
  },
  sloganText: {
    fontSize: 18,
    color: "#666",
  },
  postContainer: {
    height: moderateScale(200),
    width: "100%",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  post: {
    height: "100%",
    width: "100%",
    borderWidth: 0,
    resizeMode: "contain",
  },
  slogansNumber: {
    flexDirection: "row",
    alignItems: "center",
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
  desc: {
    fontSize: 15,
    marginTop: moderateScale(10),
  },
  add: {
    fontSize: 16,
    margin: 10,
  },
  slogan: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    margin: 10,
  },
  sloganpenc: {
    height: moderateScale(15),
    width: moderateScale(15),
  },
  creatorImage: {
    height: moderateScale(30),
    width: moderateScale(30),
    padding: moderateScale(10),
    marginRight: moderateScale(10),
    marginLeft: moderateScale(10),
    marginTop: moderateScale(10),
    borderRadius: 50,
  },
  creator_name: {
    flexDirection: "row",
    alignItems: "center",
  },
  creatorText: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent:'center',
    alignItems:'left'


  },
  creator: {
    marginTop: moderateScale(10),
    paddingEnd: moderateScale(10),
    backgroundColor: "#DDDD",
    borderRadius: 10,
  },
  winnerslogan: {
    fontSize: 16,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginLeft:moderateScale(20)
  },
  noWinningSlogancontainer:{
    justifyContent:'center',
    alignItems:'center'

  },
  noWinningSlogan:{
    fontSize:16,
    fontWeight:'bold',
    marginBottom:moderateScale(10),
  }
});

export default SloganPost;
