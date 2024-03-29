import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';

//user-define Import files
import {styles} from './styles';

export const SocialButton = (props: any) => {
  const {title, icon} = props;

  return (
    <TouchableOpacity style={styles.SocialBtnOpacity}>
      <Image style={styles.signInImage} resizeMode="contain" source={icon} />
      <Text style={styles.socialText}>{title}</Text>
    </TouchableOpacity>
  );
};
