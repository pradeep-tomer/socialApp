import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {firebase} from '@react-native-firebase/auth';

//user-define Import files
import {styles} from './styles';
import Post from '../../../Components/Post';
import {getDataAction} from '../../../Redux/Actions/getdataAction';
import LoaderScreen from '../../../Components/Loader';
import {userNameAction} from '../../../Redux/Actions/getuserName';

const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state?.getDataReducer);
  const [load, setLoad] = useState(5);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDataAction(load, setLoader));
    const user = firebase.auth().currentUser;
    if (user) {
      dispatch(userNameAction(user?.uid));
    }
  }, []);

  const onEnd = () => {
    // setLoader(true);
    // dispatch(getDataAction(load + 5, setLoader));
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
