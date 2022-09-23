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
import { userNameType } from '../../../Common/types';

const ProfileScreen = () => {
  const dispatch = useDispatch<any>();
  const user_id = useSelector(
    (state: any) => state.loginReducer?.userInfo?.uid,
  );
  const user_name = useSelector((state: any) => state.nameReducer?.name);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    user_name.map((item: userNameType, index: number) => {
      if (item?.id == user_id) {
        setName(item?.name);
      }
    });
  }, [user_name]);

  const signOut = () => {
    dispatch(logOut());
  };

  const save = () => {
    const valid = name_validate(name);
    if (valid) {
      updateUser(user_id, name);
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
