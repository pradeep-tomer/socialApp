import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

//user-define Import files
import {styles} from './styles';
import {data} from '../../../Common/types';
import Post from '../../../Components/Post';
import {getDataAction} from '../../../Redux/Actions/getdataAction';
import LoaderScreen from '../../../Components/Loader';
import * as Storage from '../../../Services/asyncStoreConfig';
import {change_Name} from '../../../Redux/types';

const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state?.getDataReducer);

  useEffect(() => {
    dispatch(getDataAction());
    Storage.getData('userName')
      .then(res => {
        dispatch({
          type: change_Name,
          payload: res,
        });
      })
      .catch(error => {
        console.log('Rejected: ', error);
      });
  }, []);

  return (
    <>
      {state?.data ? (
        <View style={styles.container}>
          <ScrollView style={{flex: 1}}>
            {state?.data.map((item: object, index: number) => {
              return <Post key={index} item={item} />;
            })}
          </ScrollView>
        </View>
      ) : (
        <LoaderScreen />
      )}
    </>
  );
};

export default HomeScreen;
