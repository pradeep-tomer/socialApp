import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

//user-define import files
import {like, unLike} from '../../Utils/images';
import {styles} from './styles';
import {updateData} from '../../Firebase';

const Post = (data: any) => {
  const [likes, setLikes] = useState(false);
  const user_name=useSelector((state:any)=>state.nameReducer)
  const {item,style} = data;
  const {name}=user_name;

  useEffect(() => {
    if (item?.count > 0) setLikes(true);
  }, [user_name.name]);

  const likeStatus = (data: any) => {
    const {count, id} = data;
    if (likes) {
      const number = count - 1;
      updateData({id, number});
      setLikes(false);
    } else {
      const number = count + 1;
      updateData({id, number});
      setLikes(true);
    }
  };

  return (
    <View style={[styles.container,style]}>
      <Text style={[styles.text, {fontSize: hp(2.2)}]}>{item?.name}</Text>
      {item?.description ? (
        <Text style={styles.text}>{item?.description}</Text>
      ) : null}
      {item?.url ? (
        <Image
          style={styles.img}
          source={{
            uri: item?.url,
          }}
        />
      ) : null}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              likeStatus(item);
            }}
            style={{marginTop: hp(1)}}>            
            <Image style={styles.likeImage} source={likes ? like : unLike} />
          </TouchableOpacity>
          <Text style={styles.text}>like:{item?.count}</Text>
        </View>
        <Text style={[styles.text, {flex: 1, textAlign: 'right'}]}>
          {item?.time}
        </Text>
      </View>
    </View>
  );
};

export default Post;
