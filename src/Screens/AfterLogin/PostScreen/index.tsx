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

//user-define Import files
import {styles} from './styles';
import {image} from '../../../Utils/images';
import Button from '../../../Components/Button';
import {description_Validation} from '../../../Validation/Validation';
import {galleryAction} from '../../../Redux/Actions/imageAction';
import {uploadData} from '../../../Firebase';

const PostScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state.imageReducer);
  const [description, setDescription] = useState<string>('');
  const {image_Url} = state;
  console.log('State Data: ', state);

  const uploadImage = () => {
    dispatch(galleryAction());
  };

  const Post = () => {
    const valid = description_Validation(description);
    uploadData({description, image_Url});
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
        <Image style={styles.img} source={image} />
        <Text style={{fontSize: hp(2.5)}}>Add photo</Text>
      </TouchableOpacity>
      <Button title="POST" onPress={Post} />
    </ScrollView>
  );
};

export default PostScreen;
