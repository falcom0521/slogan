import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawerContent(props) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      props.navigation.navigate('Login'); // Correctly access the navigation prop
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Drawer items */}
        <View>
          <DrawerItemList {...props} />
        </View>

        {/* Custom button */}
        <View style={styles.logout}>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logout: {
    padding: moderateScale(20),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#B12341',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    width: moderateScale(134),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
});

export default CustomDrawerContent;
