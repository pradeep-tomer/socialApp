import {View, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

//user-define Import files
import {styles} from './styles';
import Post from '../../../Components/Post';
import Button from '../../../Components/Button';
import {dataDelete} from '../../../Firebase';
import {postItem } from '../../../Common/types';
import { Loader } from '../../../Components/Loader';

const MyPostScreen = () => {
  const state = useSelector((state: any) => state.getDataReducer);
  const userData = useSelector((state: any) => state.loginReducer);
  const user_Name = useSelector((state: any) => state.nameReducer);
  const dispatch = useDispatch<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const [myPosts, setMyPosts] = useState<postItem[]>([]);
  const {userInfo} = userData;

  useEffect(() => {
    const data = [];
    for (var i = 0; i < state?.data.length; i++) {
      if (state?.data[i]?.uid == userInfo?.uid) {
        data.push(state?.data[i]);
      }
    }
    setMyPosts(data);
  }, [state, user_Name]);

  const Delete = (postId: string) => {
    dataDelete(postId);
  };

  const onEnd = () => {
    // setLoader(true);
    // dispatch(getDataAction(load + 5, setLoader));
    // setLoad(load + 5);
  };

  return (
    <View style={styles.container}>
      {!(myPosts.length == 0) ? (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Loader visible={loader} />
            <FlatList
              data={myPosts}
              keyExtractor={(item:any, index:number) => item.postId}
              renderItem={({item}: {item: any; index: number}) => {
                return (
                  <View>
                    <Post item={item} />
                    <Button
                      style={styles.btn}
                      title="Delete"
                      onPress={() => {
                        Delete(item?.postId);
                      }}
                    />
                  </View>
                );
              }}
              onEndReachedThreshold={0.5}
              onEndReached={onEnd}
            />
          </View>
        </View>
      ) : (
        <View style={styles.noDataView}>
          <Text style={styles.noDataText}>Data Not Found</Text>
        </View>
      )}
    </View>
  );
};

export default MyPostScreen;
