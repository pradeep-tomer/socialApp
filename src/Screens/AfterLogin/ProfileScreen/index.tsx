import {View, Text} from 'react-native';
import React, {useState} from 'react';

//user-define import Files
import {styles} from './styles';
import Button from '../../../Components/Button';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../Redux/Actions/loginAction';
import {EditText} from '../../../Components/TextInput';
import {user} from '../../../Utils/images';

const ProfileScreen = () => {
  const dispatch = useDispatch<any>();
  const [name, setName] = useState<string>('');

  const signOut = () => {
    dispatch(logOut());
  };
  console.log('Name: ', name);
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Name</Text>
      <EditText
        placeholder="Enter Name"
        leftIcon={user}
        secureTextEntry={false}
        onChangeText={(value: string) => setName(value)}
      />
      <Button title="SAVE" />
      <Button title="SIGNOUT" onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;
