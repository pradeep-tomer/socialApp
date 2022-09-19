import {
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {firebase} from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';

//user-define Import files
import {styles} from './styles';
import {image} from '../../../Utils/images';
import Button from '../../../Components/Button';
import {description_Validation} from '../../../Validation/Validation';
import {galleryAction} from '../../../Redux/Actions/imageAction';
import {createPostInDb, uploadData} from '../../../Firebase';
import {userNameAction} from '../../../Redux/Actions/getuserName';

const PostScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state.imageReducer);
  const userData = useSelector((state: any) => state.loginReducer);
  const user_name = useSelector((state: any) => state.nameReducer);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {image_Url} = state;
  const {userInfo} = userData;
  const uid = userInfo?.uid;
  const name = user_name?.name;

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      dispatch(userNameAction(user?.uid));
    }
  }, []);

  const uploadImage = () => {
    dispatch(galleryAction());
  };
  const Post = () => {
    if (description.trim() || image_Url) {
      if (description.trim() && image_Url) {
        const valid = description_Validation(description);
        if (valid) {
          setLoading(true);
          uploadData({description, image_Url, name, uid}, setLoading);
        }
      } else {
        if (!image_Url) {
          const valid = description_Validation(description);
          if (valid) {
            createPostInDb({
              description,
              time: Date.now(),
              count: 0,
              url: '',
              name,
              uid,
            });
          }
        } else {
          setLoading(true);
          uploadData({description, image_Url, name, uid}, setLoading);
        }
      }
    } else Toast.show('Please Select an Image or write Description');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.inputLabel, {marginTop: hp(5)}]}>Description</Text>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <TextInput
        multiline={true}
        onChangeText={(value: string) => {
          setDescription(value);
        }}
        placeholder="Enter Description"
        style={styles.inputField}
      />
      <TouchableOpacity style={styles.opacityImage} onPress={uploadImage}>
        {image_Url ? (
          <Image
            style={[styles.img, {width: '100%', borderRadius: wp(4)}]}
            source={{uri: image_Url}}
          />
        ) : (
          <>
            <Image style={styles.img} source={image} />
            <Text style={{fontSize: hp(2.5)}}>Add photo</Text>
          </>
        )}
      </TouchableOpacity>
      <Button title="POST" onPress={Post} />
    </ScrollView>
  );
};

export default PostScreen;
