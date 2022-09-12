import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
} from '../../../Utils/images';
import Button from '../../../Components/Button';
import {SocialButton} from '../../../Components/SocialButton';

const LoginScreen = () => {
  const [secureText, setSecureText] = useState<boolean>(true);
  const [checkBoxStatus, setCheckBoxStatus] = useState<boolean>(false);

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
          />
          <View style={styles.checkBoxView}>
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
            <View style={styles.forgotView}>
              <TouchableOpacity disabled={true}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: hp(2)}}>
                  forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button title="LOGIN" />
          <SocialButton title="Google" icon={Google} />
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
