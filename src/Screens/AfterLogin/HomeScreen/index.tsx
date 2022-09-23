import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

//user-define Import files
import {styles} from './styles';
import Post from '../../../Components/Post';
import {getDataAction} from '../../../Redux/Actions/getdataAction';
import LoaderScreen from '../../../Components/Loader';
import {userNameAction} from '../../../Redux/Actions/getuserNameAction';
import { postItem } from '../../../Common/types';

const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state?.getDataReducer);
  const user_name = useSelector((state: any) => state?.nameReducer);
  const [loader, setLoader] = useState<boolean>(false);
  const [postRecord,setMyPosts]=useState<postItem[]>([]);

  useEffect(() => {
    dispatch(getDataAction(setLoader));
    dispatch(userNameAction());
  }, []);

  useEffect(() => {
    const data = [];
    for (var i = 0; i < state?.data.length; i++) {
        data.push(state?.data[i]);
    }
    setMyPosts(data);
  }, [state, user_name]);

  const onEnd = () => {
    // setLoader(true);
    // dispatch(getDataAction(setLoader));
    // setLoad(load + 5);
  };

  return (
    <>
      {state?.data ? (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Spinner
              visible={loader}
              textContent={'Loading...'}
              textStyle={{color: '#FFF'}}
            />
            <FlatList
              data={postRecord}
              keyExtractor={(item:any, index) => {
                return(item.postId)}}
              renderItem={({item}: {item: postItem; index: number}) => (
                <Post item={item} />
              )}
              onEndReachedThreshold={0.5}
              onEndReached={onEnd}
            />
          </View>
        </View>
      ) : (
        <LoaderScreen />
      )}
    </>
  );
};

export default HomeScreen;
