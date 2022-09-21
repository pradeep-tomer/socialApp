import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

//user-define import files
import {like, unLike} from '../../Utils/images';
import {styles} from './styles';
import {getName, likeUpdate} from '../../Firebase';

const Post = (data: any) => {
  const userInfo = useSelector((state: any) => state.loginReducer?.userInfo);
  const userName = useSelector((state: any) => state.nameReducer);
  const [name, setName] = useState<string>('');
  const {item, style} = data;

  useEffect(() => {
    getName(item?.uid).then(res => {
      setName(res?.name);
    });
  }, [userName]);

  const likeCheck = (item: any) => {
    if (item.indexOf(userInfo?.uid) == -1) {
      return false;
    } else {
      return true;
    }
  };

  const likeStatus = (item: any) => {
    const {likes} = item;
    const status = likeCheck(likes);
    if (status) {
      likeUpdate(item, userInfo?.uid);
    } else {
      likeUpdate(item, userInfo?.uid);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, {fontSize: hp(2.2)}]}>{name}</Text>
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
              // source={likeCheck(item?.postId) ? like : unLike}
              source={likeCheck(item?.likes) ? like : unLike}
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
