import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../HomeScreen';  // Ensure this path is correct
import AboutUs from './AboutUs';
import TermAndCondition from './TermAndCondition';
import Settings from './Settings';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName='Home' >
      <Drawer.Screen name='Home' component={HomeScreen} options={{ headerShown: true}}/>
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false}}/>
      <Drawer.Screen name="Terms and Condition" component={TermAndCondition} options={{ headerShown: false}} />
      <Drawer.Screen name="Profile" component={Settings} options={{ headerShown: false}}/>
    </Drawer.Navigator>
  );
}
