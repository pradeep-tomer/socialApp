import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//user-define Import files
import HomeScreen from '../Screens/AfterLogin/HomeScreen';
import ProfileScreen from '../Screens/AfterLogin/ProfileScreen';
import {home, myPost, post, profile} from '../Utils/images';
import PostScreen from '../Screens/AfterLogin/PostScreen';
import MyPostScreen from '../Screens/AfterLogin/MyPostScreen';
import BottomIcon from '../Components/BottomIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [{display: 'flex'}, null],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomIcon focused={focused} name="Home" icon={home} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomIcon focused={focused} name="Post" icon={post} />
          ),
        }}
      />
      <Tab.Screen
        name="MYPost"
        component={MyPostScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomIcon focused={focused} name="MyPost" icon={myPost} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomIcon focused={focused} name="Profile" icon={profile} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
