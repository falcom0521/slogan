import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/splashscreen';
import Role from './src/role'; 
import CompanyLoginScreen from './src/CompanyLoginScreen';
import NormalLoginScreen from './src/NormalLoginScreen';
import NormalRegisterScreen from './src/NormalRegisterScreen';
import HomeScreen from './src/HomeScreen';
import DrawerNavigation from './src/Drawer/DrawerNavigation';
import EditProfile from './src/Drawer/EditProfile';
import ForgotPassword from './src/ForgotPassword';
import OtpScreen from './src/OtpScreen';
import CreateNewPassword from './src/CreateNewPassword';
import SloganScreen from './src/SloganScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Role} />
        <Stack.Screen name="CompanyLogin" component={CompanyLoginScreen} />
        <Stack.Screen name="NormalLogin" component={NormalLoginScreen} />
        <Stack.Screen name="NormalRegisterScreen" component={NormalRegisterScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name="Drawer" component={DrawerNavigation}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="OtpScreen" component={OtpScreen}/>
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword}/>
        <Stack.Screen name="SloganScreen" component={SloganScreen} />
              




      </Stack.Navigator>
    </NavigationContainer>
  );
}
