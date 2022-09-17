import {View, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

//user-define Import files
import {styles} from './styles';
import Post from '../../../Components/Post';
import Button from '../../../Components/Button';
import {dataDelete} from '../../../Firebase';
import { userNameAction } from '../../../Redux/Actions/getuserName';

const MyPostScreen = () => {
  const state = useSelector((state: any) => state.getDataReducer);
  const userData=useSelector((state:any)=>state.loginReducer);
  const {userInfo}=userData;

  const Delete = (postId: any) => {
    dataDelete(postId);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {state?.data.map((item: any, index: number) => {
          if (item?.uid == userInfo.uid) {
            return (
              <View  key={index}>
                <Post key={index} item={item} />
                <Button
                  style={styles.btn}
                  title="Delete"
                  onPress={() => {
                    Delete(item?.postId);
                  }}
                />
              </View>
            );
          }
         
        })}
      </ScrollView>
    </View>
  );
};

export default MyPostScreen;
