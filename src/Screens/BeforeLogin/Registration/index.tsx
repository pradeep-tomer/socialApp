import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';

//user-define Import Files
import {styles} from './styles';
import {EditText} from '../../../Components/TextInput';
import {
  checkBox,
  door,
  email,
  Google,
  passwordEyes,
  passwordEyesHide,
  unCheckBox,
  user,
} from '../../../Utils/images';
import Button from '../../../Components/Button';
import {SocialButton} from '../../../Components/SocialButton';
import {RegisterValidation} from '../../../Validation/Validation';
import {registerAction} from '../../../Redux/Actions/registerAction';
import {registrationType} from '../../../Common/types';
import {googleAction} from '../../../Redux/Actions/googleAction';
import {useNavigation} from '@react-navigation/native';
import { Loader } from '../../../Components/Loader';

const RegistrationScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [secureText, setSecureText] = useState<boolean>(true);
  const [checkBoxStatus, setCheckBoxStatus] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [textField, setTextFields] = useState<registrationType>({
    email: '',
    password: '',
    fullName: '',
    confirmPass: '',
  });

  const Register = () => {
    const fieldData={
      email:textField.email.trim(),
      password:textField.password,
      fullName:textField.fullName.trim(),
      confirmPass:textField.confirmPass,
    }
    const valid = RegisterValidation(fieldData);
    if (valid) {
      if (checkBoxStatus) {
        setLoader(true);
        dispatch(registerAction(fieldData, setLoader));
        setTextFields((prev: registrationType) => ({
          email: '',
          password: '',
          fullName: '',
          confirmPass: '',
        }));
        setCheckBoxStatus(false);
      } else Toast.show('Please Agree terms & conditions');
    }
  };

  const googleLogin = () => {
    if (checkBoxStatus) {
      setLoader(true);
      dispatch(googleAction(setLoader));
    } else Toast.show('Please Agree terms & conditions');
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Loader visible={loader} />
        <ScrollView style={{flex:1}}>
          <Text style={styles.headerText}>Register</Text>
          <Text style={styles.inputLabel}>Full Name</Text>
          <EditText
            value={textField.fullName}
            placeholder="Enter your Full Name"
            leftIcon={user}
            secureTextEntry={false}
            onChangeText={(value: string) =>
              setTextFields((prev: registrationType) => ({...prev, fullName: value}))
            }
          />
          <Text style={styles.inputLabel}>Email</Text>
          <EditText
            value={textField.email}
            placeholder="Enter your Email"
            leftIcon={email}
            secureTextEntry={false}
            onChangeText={(value: string) =>
              setTextFields((prev: registrationType) => ({...prev, email: value}))
            }
          />
          <Text style={styles.inputLabel}>Password</Text>
          <EditText
            value={textField.password}
            placeholder="Enter your password"
            leftIcon={door}
            rightIcon={secureText ? passwordEyes : passwordEyesHide}
            secureTextEntry={secureText}
            rightIconPress={() => {
              setSecureText(secureText ? false : true);
            }}
            onChangeText={(value: string) =>
              setTextFields((prev: registrationType) => ({...prev, password: value}))
            }
          />
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <EditText
            value={textField.confirmPass}
            secureTextEntry={secureText}
            leftIcon={door}
            placeholder="Enter Confirm Password"
            onChangeText={(value: string) =>
              setTextFields((prev: registrationType) => ({
                ...prev,
                confirmPass: value,
              }))
            }
          />
          <View style={styles.termsView}>
            <TouchableOpacity
              style={styles.checkBoxOpacity}
              onPress={() => {
                checkBoxStatus
                  ? setCheckBoxStatus(false)
                  : setCheckBoxStatus(true);
              }}>
              <Image
                style={styles.img}
                source={!checkBoxStatus ? unCheckBox : checkBox}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {marginLeft: wp(2)}]}>
              I accept the{' '}
            </Text>
            <TouchableOpacity disabled={true}>
              <Text style={[styles.text, {color: 'blue'}]}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            style={{marginVertical: hp(4)}}
            title="Register"
            onPress={Register}
          />
          <SocialButton title="Google" icon={Google} onPress={googleLogin} />
        </ScrollView>

        <View style={styles.bottomView}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[styles.text, {color: 'blue'}]}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;
