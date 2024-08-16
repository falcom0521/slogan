import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

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
        <Text style={styles.sloganText}>{sloganText}</Text> 
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sloganContainer: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    marginVertical: 8,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    height: 45,
    width: 45,
    marginRight: 12,
  },
  usernameText: {
    fontSize: 24,
    color: '#333',
  },
  sloganText: {
    fontSize: 18,
    color: '#666',
  },
});

export default Slogans;
