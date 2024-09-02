import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { BlurView } from "expo-blur";

const Slogans = ({ Username, sloganText, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sloganContainer}>
        <View style={styles.head}>
          <Image
            style={styles.logo}
            source={imageUrl} // Use imageUrl prop
          />
          <Text style={styles.usernameText}>{Username}</Text>
        </View>
        <BlurView intensity={100} tint="dark" style={styles.blurContainer}>
                  <Text style={styles.sloganText}>{sloganText}</Text>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
    padding: 5,
    backgroundColor: "#fff",
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
});

export default Slogans;
