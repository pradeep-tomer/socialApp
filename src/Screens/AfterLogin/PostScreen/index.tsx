import {
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

//user-define Import files
import {styles} from './styles';
import {image} from '../../../Utils/images';
import Button from '../../../Components/Button';
import {description_Validation} from '../../../Validation/Validation';
import {EmptyImage, galleryAction} from '../../../Redux/Actions/imageAction';
import {createPostInDb, uploadData} from '../../../Firebase';

const PostScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state.imageReducer);
  const userData = useSelector((state: any) => state.loginReducer);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {image_Url} = state;
  const {userInfo} = userData;
  const uid = userInfo?.uid;

  const uploadImage = () => {
    dispatch(galleryAction());
  };

  const Post = () => {
    if (description.trim() || image_Url) {
      if (description.trim() && image_Url) {
        const valid = description_Validation(description);
        if (valid) {
          setLoading(true);
          uploadData({description, image_Url, uid}, setLoading);
          setDescription('');
          dispatch(EmptyImage());
          // Toast.show('Both field are available');
        }
      } else {
        if (!image_Url) {
          const valid = description_Validation(description);
          if (valid) {
            setLoading(true);
            // Toast.show('Only description are available');
            createPostInDb(
              {
                description,
                time: Date.now(),
                count: 0,
                url: '',
                uid,
                likes: [],
              },
              setLoading,
            );
            setDescription('');
          }
        } else {
          setLoading(true);
          dispatch(EmptyImage());
          // Toast.show('Only image are available');
          uploadData({description, image_Url, uid}, setLoading);
          setDescription('');
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
        value={description}
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
