import {View, ActivityIndicator} from 'react-native';
import React from 'react';

//user-define Import files
import {styles} from './styles';

const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
};

export default LoaderScreen;
