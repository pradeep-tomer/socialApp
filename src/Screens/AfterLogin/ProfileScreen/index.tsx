import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';

//user-define import Files
import {styles} from './styles';
import Button from '../../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../../Redux/Actions/loginAction';
import {EditText} from '../../../Components/TextInput';
import {user} from '../../../Utils/images';
import {name_validate} from '../../../Validation/Validation';
import {updateUser} from '../../../Firebase';

const ProfileScreen = () => {
  const dispatch = useDispatch<any>();
  const userData = useSelector((state: any) => state.loginReducer);
  const user_name = useSelector((state: any) => state.nameReducer);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(user_name?.name);
  }, []);

  const signOut = () => {
    dispatch(logOut());
  };

  const save = () => {
    console.log('Name Change: ');
    const valid = name_validate(name);
    if (valid) {
      updateUser(userData?.userInfo?.uid, name);
      Toast.show('Name change Successfully');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Full Name</Text>
      <EditText
        value={name}
        placeholder="Enter your Full Name"
        leftIcon={user}
        secureTextEntry={false}
        onChangeText={(value: string) => setName(value)}
      />
      <Button title="SAVE" onPress={save} />
      <Button title="SIGNOUT" onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;
