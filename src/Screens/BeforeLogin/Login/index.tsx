import {View, Text, TouchableOpacity,ScrollView} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';

//user-define Import Files
import {styles} from './styles';
import {EditText} from '../../../Components/TextInput';
import {
  door,
  email,
  Google,
  passwordEyes,
  passwordEyesHide,
} from '../../../Utils/images';
import Button from '../../../Components/Button';
import {SocialButton} from '../../../Components/SocialButton';
import {LoginValidation} from '../../../Validation/Validation';
import {loginAction} from '../../../Redux/Actions/loginAction';
import {loginType} from '../../../Common/types';
import {googleAction} from '../../../Redux/Actions/googleAction';

const LoginScreen = () => {
  const dispatch = useDispatch<any>();
  const [secureText, setSecureText] = useState<boolean>(true);
  const [textFiled, setTextFields] = useState<loginType>({
    email: '',
    password: '',
  });

  const Login = () => {
    const valid = LoginValidation(textFiled);
    if (valid) {
      dispatch(loginAction(textFiled));
    }
  };

  const googleLogin = () => {
    dispatch(googleAction());
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{flex: 1, height: hp(100), backgroundColor: 'skyblue'}}>
        <ScrollView style={styles.container}>
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.inputLabel}>Email</Text>
          <EditText
            placeholder="Enter your Email"
            leftIcon={email}
            secureTextEntry={false}
            onChangeText={(value: string) =>
              setTextFields((prev: any) => ({...prev, email: value}))
            }
          />
          <Text style={styles.inputLabel}>Password</Text>
          <EditText
            placeholder="Enter your password"
            leftIcon={door}
            rightIcon={secureText ? passwordEyes : passwordEyesHide}
            secureTextEntry={secureText}
            rightIconPress={() => {
              setSecureText(secureText ? false : true);
            }}
            onChangeText={(value: string) =>
              setTextFields((prev: any) => ({...prev, password: value}))
            }
          />
          <View style={styles.checkBoxView}>
            <View style={styles.forgotView}>
              <TouchableOpacity disabled={true}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: hp(2)}}>
                  forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button title="LOGIN" onPress={Login} />
          <SocialButton title="Google" icon={Google} onPress={googleLogin} />
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
