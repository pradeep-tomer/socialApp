import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//user-define Import files
import BeforeLoginNavigator from './beforeloginStack';
const RootStack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Before" component={BeforeLoginNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
