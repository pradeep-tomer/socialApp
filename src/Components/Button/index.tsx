import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

//user -define import files
import {styles} from './styles';

const Button = (data: any) => {
  const {title, onPress, disabled, style} = data;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.btnOpacity, style]}
      onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
