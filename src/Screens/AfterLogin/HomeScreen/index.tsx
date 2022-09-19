import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList, ListRenderItem, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//user-define Import files
import {styles} from './styles';
import Post from '../../../Components/Post';
import {
  getDataAction,
  getLikeAction,
} from '../../../Redux/Actions/getdataAction';
import LoaderScreen from '../../../Components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state?.getDataReducer);
  const [load, setLoad] = useState(5);

  useEffect(() => {
    dispatch(getDataAction(load));
    dispatch(getLikeAction());
  }, []);
  const onEnd = () => {
    console.log('Load Data: ');
    // dispatch(getDataAction(load + 1));
    // setLoad(load + 1);
  };
  return (
    <>
      {state?.data && state?.likeRecord ? (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            {/* {state?.data.map((item: object, index: number) => {
              console.log('Item: ', item);
              return <Post key={index} item={item} />;
            })} */}
            <FlatList
              data={state?.data}
              keyExtractor={(item, index) => item.postId}
              renderItem={({item}: {item: any; index: number}) => (
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
