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
  User_Name,
} from '../Redux/types';
import * as Storage from '../Services/asyncStoreConfig';
import NavigationService from '../Navigation/NavigationService';
import {loginType, registrationType} from '../Common/types';
import {user} from '../Utils/images';

export const register = (data: registrationType) => {
  const {email, password, fullName} = data;

  return async (dispatch: any) => {
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = isUserCreated?.user?.uid;      
      userInfoDb(uid,fullName);
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
            payload: res?.user,
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
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.idToken,
      );
      const res = await auth().signInWithCredential(googleCredential);
      const uid=res?.user?.uid;
      const name=res?.user?.displayName;
      userInfoDb(uid,name)
      // dispatch({
      //   type: User_Name,
      //   payload: name,
      // });
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
    Toast.show('Data added successfully');
  } catch (err) {
    console.log('Error aya re: ', err);
  }
};

export const uploadData = async (data: any) => {
  const {description, image_Url, uid, name} = data;
  const uniqueName = Date.now();
  await storage()
    .ref(uniqueName + '.jpeg')
    .putFile(image_Url);
  const url = await storage()
    .ref(uniqueName + '.jpeg')
    .getDownloadURL();
  createPostInDb({
    description,
    url,
    count: 0,
    time: uniqueName,
    name,
    uid,
  });
};
const userInfoDb=async(uid:any,name:any)=>{
  try {
    await firestore().collection('users').doc(uid).set({name:name})
  } catch (err) {
    console.log('Error aya re: ', err);
  }
}

export const getUserName =  (uid:string) => {
  return async(dispatch:any)=>{
    await firestore()
    .collection('users')
    .onSnapshot((res: any) => {
      res.docs.map((item:any,index:number)=>{
        if(uid==item?.id){          
        dispatch({
          type:User_Name,
          payload:item?.data().name
        })
        }
      })
    });
  }
};
export const updateUser = (uid: string,name:string) => {
  // console.log("update Data: ",  uid)
  // console.log("update name: ",  name)
  firestore().collection('users').doc(uid)
  .update({name});
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
          const uid = item?.data()?.uid;
          const postId=item?.id;
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
      // console.log("res: ",postId);
      Toast.show('Post deleted successfully');
    });
};

