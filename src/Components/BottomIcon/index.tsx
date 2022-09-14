import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//user-define Import files
import {styles} from './styles';

const BottomIcon = (data: any) => {
  const {focused, icon, name} = data;

  return (
    <View style={styles.container}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.img, {tintColor: focused ? 'blue' : 'black'}]}
      />
      <Text style={{color: focused ? 'blue' : 'black', fontSize: hp(2)}}>
        {name}
      </Text>
    </View>
  );
};

export default BottomIcon;
