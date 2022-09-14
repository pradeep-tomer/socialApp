import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

//user-define Import files
import {styles} from './styles';
import {data} from '../../../Common/types';
import {like, unLike} from '../../../Utils/images';
import Post from '../../../Components/Post';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {data.map((item: object, index: number) => {
          return <Post key={index} item={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
