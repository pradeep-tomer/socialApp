import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

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


export const Loader=({visible}:any)=>{
  return(
    <View>
      <Spinner
          visible={visible}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
    </View>
  )
}