import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//user-define Import files
import HomeScreen from '../Screens/AfterLogin/HomeScreen';
import ProfileScreen from '../Screens/AfterLogin/ProfileScreen';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
