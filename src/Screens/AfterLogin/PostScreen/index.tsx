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

//user-define Import files
import {styles} from './styles';
import {image} from '../../../Utils/images';
import Button from '../../../Components/Button';
import {description_Validation} from '../../../Validation/Validation';
import {galleryAction} from '../../../Redux/Actions/imageAction';
import {createUserInDb, uploadData} from '../../../Firebase';
// import * as Storage from '../../../Services/asyncStoreConfig';

const PostScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state.imageReducer);
  const user_name = useSelector((state: any) => state.nameReducer);
  const [description, setDescription] = useState<string>('');
  const {image_Url} = state;
  const {name} = user_name;

  const uploadImage = () => {
    dispatch(galleryAction());
  };
  const Post = () => {
    if (description.trim() || image_Url) {
      if (description.trim() && image_Url) {
        const valid = description_Validation(description);
        if (valid) uploadData({description, image_Url, name});
      } else {
        if (!image_Url) {
          const valid = description_Validation(description);
          if (valid) {
            createUserInDb({
              description,
              time: Date.now(),
              count: 0,
              name,
              url: '',
            });
          }
        } else {
          uploadData({description, image_Url, name});
          Toast.show('Only Image here');
        }
      }
    } else Toast.show('Please Select an Image or write Description');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.inputLabel, {marginTop: hp(5)}]}>Description</Text>
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
