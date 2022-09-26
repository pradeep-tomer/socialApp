import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

//user-define import Files
import {
  Empty_Post,
  Get_Data,
  Image_Success,
  Login_Success,
  Logout_Success,
  User_Name,
} from '../Redux/types';
import * as Storage from '../Services/asyncStoreConfig';
import NavigationService from '../Navigation/NavigationService';
import {loginType, registrationType} from '../Common/types';

export const register = (data: registrationType, setLoader: any) => {
  const {email, password, fullName} = data;

  return async (dispatch: any) => {
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = isUserCreated?.user?.uid;
      userInfoDb(uid, fullName);
      auth().currentUser?.sendEmailVerification();
      NavigationService.navigate('Login');
      setLoader(false);
      Toast.show(
        'Please verify email check out link in your inbox',
        Toast.LONG,
      );
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setLoader(false);
        NavigationService.navigate('Login');
        Toast.show('Account Already exist Please Login');
      } else {
        Toast.show('something went wrong');
      }
    }
  };
};

export const signIn = (data: loginType, setLoader: any) => {
  const {email, password} = data;

  return (dispatch: any) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user.emailVerified) {
          Storage.saveData('Token', 'Token');
          dispatch({
            type: Login_Success,
            payload: res?.user,
          });
          setLoader(false);
          Toast.show('Login Successfully');
        } else {
          setLoader(false);
          Toast.show('Please Verify Your Email');
        }
      })
      .catch(Err => {
        setLoader(false);
        Toast.show('Invalid credential');
      });
  };
};

export const googleLogin = (setLoader: any) => {
  return async (dispatch: any) => {
    try {
      const userInfo = await GoogleSignin.signIn();
      Storage.saveData('Token', 'Token');
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.idToken,
      );
      const res = await auth().signInWithCredential(googleCredential);
      const uid = res?.user?.uid;
      const name = res?.user?.displayName;
      userInfoDb(uid, name);
      setLoader(false);
      dispatch({
        type: Login_Success,
        payload: res?.user,
      });
      return res;
    } catch (err) {
      setLoader(false);
      Toast.show('Something Went Wrong');
      console.log('Google error!' + err);
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
        console.log('Gallery Error: ' + err);
      });
  };
};

export const createPostInDb = async (data: any, setLoading: any) => {
  try {
    await firestore().collection('Posts').add(data);
    NavigationService.navigate('Home');
    setLoading(false);
    Toast.show('Post added successfully');
  } catch (err) {
    console.log('Post Not added: ', err);
  }
};

export const uploadData = async (data: any, setLoading: any) => {
  const {description, image_Url, uid} = data;
  const uniqueName = Date.now();
  await storage()
    .ref(uniqueName + '.jpeg')
    .putFile(image_Url);
  const url = await storage()
    .ref(uniqueName + '.jpeg')
    .getDownloadURL();
  createPostInDb(
    {
      description,
      url,
      count: 0,
      time: uniqueName,
      uid,
      likes: [],
    },
    setLoading,
  );
};

const userInfoDb = async (uid: any, name: any) => {
  try {
    await firestore().collection('users').doc(uid).set({name: name});
  } catch (err) {
    console.log('User not added: ', err);
  }
};

export const updateUser = (uid: string, name: string) => {
  firestore()
    .collection('users')
    .doc(uid)
    .update({name})
    .then(res => {
      Toast.show('Name change Successfully');
    })
    .catch(err => {
      Toast.show('Something Went wrong Please try after Sometimes');
    });
};

export const getUserName = () => {
  return async (dispatch: any) => {
    try {
      let data: Array<object> = [];
      await firestore()
        .collection('users')
        .onSnapshot((res: any) => {
          res.docs.map((item: any, index: number) => {
            if (index == 0) {
              data = [];
            }
            const id = item?.id;
            const name = item?.data()?.name;
            data.push({id, name});
            dispatch({
              type: User_Name,
              payload: data,
            });
          });
        });
    } catch (err) {
      console.log('Error: ', err);
    }
  };
};

export const firebaseGetData = (setLoader: any, loadData: any) => {
  return (dispatch: any) => {
    try {
      let data: Array<object> = [];
      let query = firestore().collection('Posts').orderBy('time', 'desc');
      if (loadData !== undefined) {
        query = query.startAfter(loadData);
      }
      query.limit(6).onSnapshot(querySnap => {
        const last = querySnap.docs[querySnap.docs.length - 1];
        const length = querySnap.docs.length;
        console.log('Length: ', length);
        if (length != 0) {
          querySnap.docs.map((item, index) => {
            if (index == 0) {
              data = [];
            }
            const likes = item?.data()?.likes;
            const count = item?.data()?.count;
            const description = item?.data()?.description;
            const unix_time = item?.data()?.time;
            const time = moment(unix_time).format('h:mm A');
            const url = item?.data()?.url;
            const uid = item?.data()?.uid;
            const postId = item?.id;
            data.push({
              count,
              description,
              uid,
              time,
              url,
              postId,
              likes,
            });
          });
          if (length == 6 && loadData == undefined) {
            dispatch({
              type: Empty_Post,
            });
          }
          dispatch({
            type: Get_Data,
            payload: {data, last},
          });
        }
        setLoader(false);
      });
    } catch (err) {
      console.log('Error: ', err);
    }
  };
};

export const dataDelete = (postId: string) => {
  firestore()
    .collection('Posts')
    .doc(postId)
    .delete()
    .then(res => {
      Toast.show('Post deleted successfully');
    })
    .catch(err => {
      Toast.show('Something went wrong');
    });
};

export const likeUpdate = (item: any, user_id: string) => {
  const {postId} = item;
  const database = firestore();
  database
    .collection('Posts')
    .get()
    .then(res => {
      res.docs.map((item: any, index: number) => {
        if (item?.id == postId) {
          const likes = item?.data()?.likes;
          const count = item?.data()?.count;
          const description = item?.data()?.description;
          const uid = item?.data()?.uid;
          const time = item?.data()?.time;
          const url = item?.data()?.url;
          if (!(likes.indexOf(user_id) == -1)) {
            const index = likes.indexOf(user_id);
            if (index > -1) {
              likes.splice(index, 1);
            }
            const data = {
              count: count - 1,
              description,
              uid,
              time,
              likes,
              url,
            };
            updateRecord(data, postId);
          } else {
            likes.push(user_id);
            const data = {
              count: count + 1,
              description,
              uid,
              time,
              likes,
              url,
            };
            updateRecord(data, postId);
          }
        }
      });
    })
    .catch(err => {
      console.log('Error: ', err);
    });
};

export const updateRecord = (data: object, postId: any) => {
  try {
    firestore().collection('Posts').doc(postId).update(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};
