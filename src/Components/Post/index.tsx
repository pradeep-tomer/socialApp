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
import {likeRecord, updateData} from '../../Firebase';

const Post = (data: any) => {
  const state=useSelector((state:any)=>state.loginReducer);
  const [likes, setLikes] = useState(false);
  const {item,style} = data;
  // console.log("State Data: ",state?.userInfo?.uid);

  useEffect(() => {
    if (item?.count > 0) setLikes(true);
  }, []);

  const likeStatus = (data: any) => {
    const {count, postId} = data;
    if (likes) {
      const number = count - 1;
      updateData({postId, number});
      setLikes(false);
    } else {
      likeRecord(state?.userInfo?.uid,postId)
      const number = count + 1;
      updateData({postId, number});
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
