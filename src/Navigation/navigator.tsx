import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';

//user-define Import files
import NavigationService from './NavigationService';
import BeforeLoginNavigator from './beforeLoginNavigator';
import AfterLoginNavigator from './afterLoginNavigator';
import * as Storage from '../Services/asyncStoreConfig';
import {Loader_status, Login_Success} from '../Redux/types';
import LoaderScreen from '../Components/Loader';
const RootStack = createNativeStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state.loginReducer);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '402265270465-pqpk1j4sfu56vdjqkt4g38dncv98437i.apps.googleusercontent.com',
    });

    const user = firebase.auth().currentUser;
    if (user) {
      dispatch({
        type: Login_Success,
        payload: user,
      });
    }
    Storage.getData('Token')
      .then(res => {
        dispatch({
          type: Loader_status,
          payload: res,
        });
      })
      .catch(error => {
        console.log('Rejected: ', error);
      });
  }, []);

  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!state?.hideProgress ? (
          <RootStack.Screen name="Loader" component={LoaderScreen} />
        ) : state?.authStatus == 'Token' ? (
          <RootStack.Screen name="AfterLogin" component={AfterLoginNavigator} />
        ) : (
          <RootStack.Screen
            name="BeforeLogin"
            component={BeforeLoginNavigator}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
