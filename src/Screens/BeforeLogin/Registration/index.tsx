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

const RegistrationScreen = () => {
  const dispatch = useDispatch<any>();
  const [secureText, setSecureText] = useState<boolean>(true);
  const [checkBoxStatus, setCheckBoxStatus] = useState<boolean>(false);
  const [textFiled, setTextFields] = useState<registrationType>({
    email: '',
    password: '',
    fullName: '',
    confirmPass: '',
  });

  const Register = () => {
    const valid = RegisterValidation(textFiled);
    if (valid) {
      if (checkBoxStatus) dispatch(registerAction(textFiled));
      else Toast.show('Please Check the checkBox');
    }
  };

  const googleLogin = () => {
    dispatch(googleAction());
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{flex: 1, height: hp(100), backgroundColor: 'skyblue'}}>
        <ScrollView style={styles.container}>
          <Text style={styles.headerText}>Register</Text>
          <Text style={styles.inputLabel}>Full Name</Text>
          <EditText
            placeholder="Enter your Full Name"
            leftIcon={user}
            secureTextEntry={false}
            onChangeText={(value: string) =>
              setTextFields((prev: any) => ({...prev, fullName: value}))
            }
          />
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
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <EditText
            leftIcon={door}
            placeholder="Enter Confirm Password"
            secureTextEntry={secureText}
            onChangeText={(value: string) =>
              setTextFields((prev: any) => ({...prev, confirmPass: value}))
            }
          />
          <View>
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
          </View>
          <Button disabled={true} title="Agree to Terms and Conditions" />
          <Button title="Register" onPress={Register} />
          <SocialButton title="Google" icon={Google} onPress={googleLogin} />
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: hp(1),
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(2)}}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity>
            <Text
              style={{fontWeight: 'bold', color: 'blue', fontSize: hp(2.2)}}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;
