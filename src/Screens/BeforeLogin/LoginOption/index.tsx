import {Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

//user-define Import Files
import {styles} from './styles';
import Button from '../../../Components/Button';

const LoginOption = () => {
  const navigation = useNavigation<any>();

  const Login = () => {
    navigation.navigate('Login');
  };

  const SignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Button title="LOGIN" onPress={Login} />
      <Button title="SIGNUP" onPress={SignUp} />
    </View>
  );
};

export default LoginOption;
