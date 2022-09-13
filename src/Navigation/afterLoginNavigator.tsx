import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Import User-define files
import BottomTabNavigator from './bottomTabNavigator';

const AfterLoginStack = createNativeStackNavigator();

const AfterLoginNavigator = () => {
  return (
    <AfterLoginStack.Navigator screenOptions={{headerShown: false}}>
      <AfterLoginStack.Screen name="Bottom" component={BottomTabNavigator} />
    </AfterLoginStack.Navigator>
  );
};

export default AfterLoginNavigator;
