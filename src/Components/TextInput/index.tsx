import {View, TextInput, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//user-define Import files
import {styles} from './styles';

export const EditText = (props: any) => {
  const {
    placeholder,
    containerStyle,
    onChangeText,
    leftIcon,
    secureTextEntry,
    rightIcon,
    rightIconPress,
    keyboardType,
  } = props;
  return (
    <View style={[styles.inputView, containerStyle]}>
      <Image
        style={[
          styles.Icon,
          {
            marginHorizontal: wp(2),
          },
        ]}
        source={leftIcon}
      />
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={rightIconPress} style={{marginRight: wp(2)}}>
          <Image style={styles.Icon} source={rightIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
