import auth, {firebase} from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

//user-define import Files
import {
  Get_Data,
  Image_Success,
  Login_Success,
  Logout_Success,
} from '../Redux/types';
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
        Toast.show('Invalid credential');
      });
  };
};

export const googleLogin = () => {
  return async (dispatch: any) => {
    try {
      const userInfo = await GoogleSignin.signIn();
      Storage.saveData('Token', 'Token');
      dispatch({
        type: Login_Success,
        payload: 'Token',
      });
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.idToken,
      );
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('Error aye re!' + err);
    }
  };
};

export const signOut = () => {
  auth().signOut();
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

export const galleryOpen = () => {
  return (dispatch: any) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        dispatch({
          type: Image_Success,
          payload: res?.path,
        });
      })
      .catch(err => {
        console.log('Error aya re!: ' + err);
      });
  };
};

export const createUserInDb = async (data: any) => {
  // const {description, image_Url, time, count} = data;
  console.log('Data: ', data);
  try {
    await firestore().collection('Posts').add(data);
    Toast.show('Data added successfully');
  } catch (err) {
    console.log('Error aya re: ', err);
  }
};

export const uploadData = async (data: any) => {
  const {description, image_Url, name} = data;
  const uniqueName = Date.now();
  await storage()
    .ref(uniqueName + '.jpeg')
    .putFile(image_Url);
  const url = await storage()
    .ref(uniqueName + '.jpeg')
    .getDownloadURL();
  createUserInDb({
    description,
    url,
    count: 0,
    time: uniqueName,
    name,
  });
};

export const firebaseGetData = () => {
  return (dispatch: any) => {
    let data: Array<object> = [];
    firestore()
      .collection('Posts')
      .orderBy('time', 'desc')
      .onSnapshot(querySnap => {
        querySnap.docs[0].data();
        querySnap.size;
        querySnap.docs.map((item, index) => {
          if (index == 0) {
            data = [];
          }
          const name = item?.data()?.name;
          const count = item?.data()?.count;
          const description = item?.data()?.description;
          const unix_time = item?.data()?.time;
          const time = moment(unix_time).format('h:mm A');
          const url = item?.data()?.url;
          data.push({count, name, description, time, url, id: item.id});
        });
        dispatch({
          type: Get_Data,
          payload: data,
        });
      });
  };
};

export const updateData = (data: any) => {
  const {id, number} = data;
  firestore().collection('Posts').doc(id).update({count: number});
};

export const dataDelete = (id: string) => {
  console.log('deleted id: ', id);
  firestore()
    .collection('Posts')
    .doc(id)
    .delete()
    .then(res => {
      Toast.show('Data deleted successfully');
    });
};
