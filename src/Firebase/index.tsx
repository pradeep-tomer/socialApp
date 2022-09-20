import auth from '@react-native-firebase/auth';
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
  Like_Status,
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
    } catch (err) {
      NavigationService.navigate('Login');
      Toast.show('Account Already exist Please Login');
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

export const googleLogin = () => {
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
      dispatch({
        type: Login_Success,
        payload: res?.user,
      });
      return res;
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

export const createPostInDb = async (data: any) => {
  try {
    await firestore().collection('Posts').add(data);
    NavigationService.navigate('Home');
    Toast.show('Data added successfully');
  } catch (err) {
    console.log('Error aya re: ', err);
  }
};

export const uploadData = async (data: any, setLoading: any) => {
  const {description, image_Url, uid, name} = data;
  const uniqueName = Date.now();
  await storage()
    .ref(uniqueName + '.jpeg')
    .putFile(image_Url);
  const url = await storage()
    .ref(uniqueName + '.jpeg')
    .getDownloadURL();
  setLoading(false);
  createPostInDb({
    description,
    url,
    count: 0,
    time: uniqueName,
    name,
    uid,
  });
};

const userInfoDb = async (uid: any, name: any) => {
  try {
    await firestore().collection('users').doc(uid).set({name: name});
  } catch (err) {
    console.log('Error aya re: ', err);
  }
};

export const getUserName = (uid: string) => {
  return async (dispatch: any) => {
    await firestore()
      .collection('users')
      .onSnapshot((res: any) => {
        res.docs.map((item: any, index: number) => {
          if (uid == item?.id) {
            dispatch({
              type: User_Name,
              payload: item?.data().name,
            });
          }
        });
      });
  };
};
export const updateUser = (uid: string, name: string) => {
  firestore().collection('users').doc(uid).update({name});
};
export const firebaseGetData = (load: number, setLoader: any) => {
  return (dispatch: any) => {
    let data: Array<object> = [];
    let query = firestore().collection('Posts').orderBy('time', 'desc');
    query.limit(load).onSnapshot(querySnap => {
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
        const uid = item?.data()?.uid;
        const postId = item?.id;
        data.push({
          count,
          name,
          description,
          uid,
          time,
          url,
          postId,
        });
      });
      setLoader(false);
      dispatch({
        type: Get_Data,
        payload: data,
      });
    });
  };
};

export const updateData = (data: any) => {
  const {postId, number} = data;
  firestore().collection('Posts').doc(postId).update({count: number});
};

export const dataDelete = (postId: string) => {
  firestore()
    .collection('Posts')
    .doc(postId)
    .delete()
    .then(res => {
      Toast.show('Post deleted successfully');
    });
};

export const likesPost = (uid: string, postId: string) => {
  const database = firestore();
  database
    .collection('likes')
    .get()
    .then(res => {
      for (var i = 0; i < res.docs.length; i++) {
        if (res.docs[i].id == postId) {
          const arr = res.docs[i].data().key;
          if (arr.indexOf(uid) !== -1) {
            const arr = res.docs[i].data().key;
            const unique = new Set(arr);
            database
              .collection('likes')
              .doc(postId)
              .set(
                {
                  key: [...unique],
                },
                {merge: true},
              );
            break;
          } else {
            const arr = res.docs[i].data().key;
            const unique = new Set(arr);
            database
              .collection('likes')
              .doc(postId)
              .set(
                {
                  key: [...unique, uid],
                },
                {merge: true},
              );
            break;
          }
        } else {
          database
            .collection('likes')
            .doc(postId)
            .set(
              {
                key: [uid],
              },
              {merge: true},
            );
        }
      }
    });
};

export const likeRecord = () => {
  return (dispatch: any) => {
    const database = firestore();
    database.collection('likes').onSnapshot(res => {
      const status: any = [];
      res.docs.map((item: any, index: number) => {
        const obj = {
          postId: item.id,
          data: item.data().key,
        };
        status.push(obj);
      });
      dispatch({
        type: Like_Status,
        payload: status,
      });
    });
  };
};

export const disLikesPost = (uid: string, postId: string) => {
  const database = firestore();
  database
    .collection('likes')
    .get()
    .then(res => {
      res.docs.map((item: any, index: number) => {
        if (item.id == postId) {
          if (item.id == postId) {
            if (item.data().key.indexOf(uid) != -1) {
              const arr = [];
              for (var i = 0; i < item.data().key.length; i++) {
                if (item.data().key[i] != uid) {
                  arr.push(item.data().key[i]);
                }
              }
              database
                .collection('likes')
                .doc(postId)
                .set(
                  {
                    key: [...arr],
                  },
                  {merge: true},
                );
            }
          }
        }
      });
    });
};
