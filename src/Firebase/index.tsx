import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//user-define import Files
import {Login_Success, Logout_Success} from '../Redux/types';
import * as Storage from '../Services/asyncStoreConfig';
import NavigationService from '../Navigation/NavigationService';
import {loginType, registrationType} from '../Common/types';

export const register = (data: registrationType) => {
  const {email, password} = data;

  return async (dispatch: any) => {
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      // const uid = isUserCreated?.user?.uid;
      auth().currentUser?.sendEmailVerification();
      NavigationService.navigate('Login');
      Toast.show('Please verify email check out link in your inbox');
    } catch (err) {
      console.log('Error aya re: ' + err);
      NavigationService.navigate('Login');
      Toast.show('Account Already exist Please Login');
    }
  };
};

export const signIn = (data: loginType) => {
  const {email, password} = data;

  return (dispatch: any) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user.emailVerified) {
          Storage.saveData('Token', 'Token');
          dispatch({
            type: Login_Success,
            payload: 'Token',
          });
          Toast.show('Login Successfully');
        } else {
          Toast.show('Please Verify Your Email');
        }
      })
      .catch(Err => {
        console.log('Err: ' + Err);
        Toast.show('Invalid credential');
      });
  };
};

export const googleLogin = () => {
  return async (dispatch: any) => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      Storage.saveData('Token', 'Token');
      dispatch({
        type: Login_Success,
        payload: 'Token',
      });
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('Error aye re!' + err);
    }
  };
};

export const signOut = () => {
  return async (dispatch: any) => {
    try {
      await GoogleSignin.signOut();
      Storage.removeData('Token');
      dispatch({
        type: Logout_Success,
        payload: null,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
