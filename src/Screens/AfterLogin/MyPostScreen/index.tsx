import {View, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

//user-define Import files
import {styles} from './styles';
import Post from '../../../Components/Post';
import Button from '../../../Components/Button';
import {dataDelete} from '../../../Firebase';
import {getDataAction} from '../../../Redux/Actions/getdataAction';

const MyPostScreen = () => {
  const state = useSelector((state: any) => state.getDataReducer);
  const dispatch = useDispatch<any>();
  const userData = useSelector((state: any) => state.loginReducer);
  const [load, setLoad] = useState<number>(5);
  const [loader, setLoader] = useState<boolean>(false);
  const {userInfo} = userData;

  let myPostStatus = false;
  const Delete = (postId: any) => {
    dataDelete(postId);
  };

  const onEnd = () => {
    setLoader(true);
    dispatch(getDataAction(load + 5, setLoader));
    setLoad(load + 5);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        <FlatList
          data={state?.data}
          keyExtractor={(item, index) => item.postId}
          renderItem={({item}: {item: any; index: number}) => {
            if (item?.uid == userInfo.uid) {
              myPostStatus = true;
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
            } else return null;
          }}
          onEndReachedThreshold={0.5}
          onEndReached={onEnd}
        />
      </View>
    </View>
  );
};

export default MyPostScreen;
