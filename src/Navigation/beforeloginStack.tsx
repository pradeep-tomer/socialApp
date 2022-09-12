import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Import User-define files
import LoginOption from '../Screens/BeforeLogin/LoginOption';
import LoginScreen from '../Screens/BeforeLogin/Login';
import RegistrationScreen from '../Screens/BeforeLogin/Registration';

const BeforeLoginStack = createNativeStackNavigator();

const BeforeLoginNavigator = () => {
  return (
    <BeforeLoginStack.Navigator screenOptions={{headerShown: false}}>
      <BeforeLoginStack.Screen name="Option" component={LoginOption} />
      <BeforeLoginStack.Screen name="Login" component={LoginScreen} />
      <BeforeLoginStack.Screen name="Register" component={RegistrationScreen} />
    </BeforeLoginStack.Navigator>
  );
};

export default BeforeLoginNavigator;
