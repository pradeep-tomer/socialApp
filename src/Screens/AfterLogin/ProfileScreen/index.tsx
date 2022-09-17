import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';

//user-define import Files
import {styles} from './styles';
import Button from '../../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../../Redux/Actions/loginAction';
import {EditText} from '../../../Components/TextInput';
import {user} from '../../../Utils/images';
import {name_validate} from '../../../Validation/Validation';
import { updateUser } from '../../../Firebase';

const ProfileScreen = () => {
  const dispatch = useDispatch<any>();
  const userData = useSelector((state: any) => state.loginReducer);
  const [name, setName] = useState<string>('');  

  const signOut = () => {
    dispatch(logOut());
  };
  const save = () => {
    const valid = name_validate(name);
    if (valid) {   
      updateUser(userData?.userInfo?.uid,name)   
      Toast.show('Name change Successfully');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Name</Text>
      <EditText
        placeholder="Enter Name"
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
