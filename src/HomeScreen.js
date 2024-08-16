import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import SloganPost from './Sloganpost';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <SloganPost navigation={navigation} />
      <SloganPost navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

