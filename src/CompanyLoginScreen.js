import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompanyLoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Company Login Screen</Text>
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

export default CompanyLoginScreen;
