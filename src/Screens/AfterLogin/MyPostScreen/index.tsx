import {View, ScrollView} from 'react-native';
import React from 'react';

//user-define Import files
import {styles} from './styles';
import {useSelector} from 'react-redux';
import Post from '../../../Components/Post';
import Button from '../../../Components/Button';
import {dataDelete} from '../../../Firebase';

const MyPostScreen = () => {
  const state = useSelector((state: any) => state.getDataReducer);

  const Delete = (id: any) => {
    dataDelete(id);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {state?.data.map((item: any, index: number) => {
          return (
            <View key={index}>
              <Post key={index} item={item} />
              <Button
                title="Delete"
                onPress={() => {
                  Delete(item?.id);
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MyPostScreen;
