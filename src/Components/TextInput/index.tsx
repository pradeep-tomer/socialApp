import {View, TextInput, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//user-define Import files
import {style} from './styles';

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
    <View style={[style.inputView, containerStyle]}>
      <Image
        style={[
          style.Icon,
          {
            marginHorizontal: wp(2),
          },
        ]}
        source={leftIcon}
      />
      <TextInput
        style={style.inputField}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={rightIconPress} style={{marginRight: wp(2)}}>
          <Image style={style.Icon} source={rightIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
