import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//user-define import files
import {like, unLike} from '../../Utils/images';
import {styles} from './styles';

const Post = (data: any) => {
  const [likes, setLikes] = useState(false);
  const {item} = data;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: hp(2.2)}]}>Pradeep Tomer</Text>
      <Text style={styles.text}>I am React-Native developer</Text>
      <Image
        style={styles.img}
        source={{
          uri: 'https://media.istockphoto.com/vectors/breaking-news-background-vector-id1264074047?k=20&m=1264074047&s=612x612&w=0&h=uMWPkMBKIIx3NdCbvGkfOY0oYXULdpU_-1ggACLAx7A=',
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              likes ? setLikes(false) : setLikes(true);
            }}
            style={{marginTop: hp(1)}}>
            <Image style={styles.likeImage} source={likes ? like : unLike} />
          </TouchableOpacity>
          <Text style={styles.text}>like:10</Text>
        </View>
        <Text style={[styles.text, {flex: 1, textAlign: 'right'}]}>
          3:10 PM
        </Text>
      </View>
    </View>
  );
};

export default Post;
