import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

//user-define import files
import {like, unLike} from '../../Utils/images';
import {styles} from './styles';
import {disLikesPost, likesPost, updateData} from '../../Firebase';

const Post = (data: any) => {
  const state = useSelector((state: any) => state.loginReducer);
  const likesData = useSelector((state: any) => state.getDataReducer);
  const {item, style} = data;

  const likeCheck = (postId: any) => {
    for (var i = 0; i < likesData?.likeRecord.length; i++) {
      if (likesData?.likeRecord[i].postId == postId) {
        if (likesData?.likeRecord[i].data.indexOf(state?.userInfo?.uid) == -1) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  const likeStatus = (data: any) => {
    const {count, postId} = data;
    const status = likeCheck(postId);
    if (status) {
      disLikesPost(state?.userInfo?.uid, postId);
      const number = count - 1;
      updateData({postId, number});
    } else {
      likesPost(state?.userInfo?.uid, postId);
      const number = count + 1;
      updateData({postId, number});
    }
  };

  return (
    <View style={[styles.container, style]}>
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
            <Image
              style={styles.likeImage}
              source={likeCheck(item?.postId) ? like : unLike}
            />
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
