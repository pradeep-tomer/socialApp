import Toast from 'react-native-simple-toast';

//user-define Import files
import {registrationType, loginType} from '../Common/types';

const ValidTextField = (props: object) => {
  const valid = Object.values(props)?.every(value => value?.trim());
  return valid;
};

export const fullNames = (name: string | any) => {
  const Name = name.trim();
  const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
  const valid = pattern.test(Name);
  return valid;
};

const EmailValidate = (email: string | any) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const emails = email.trim();
  if (reg.test(emails)) return true;
  else {
    return false;
  }
};

const Password_Validation = (pass: string | any) => {
  const pattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  const valid = pattern.test(pass);
  return valid;
};

export const RegisterValidation = (data: registrationType) => {
  const {fullName, email, password, confirmPass} = data;
  if (!ValidTextField(data)) return Toast.show('Required all fields');
  if (!fullNames(fullName)) return Toast.show('Invalid Name');
  if (!EmailValidate(email)) return Toast.show('Invalid Email Address');
  if (!(password == confirmPass)) return Toast.show('Password mismatch');
  if (Password_Validation(password)) return true;
  else return Toast.show('Please fill strong password');
};

export const LoginValidation = (data: loginType) => {
  const {email, password} = data;
  if (!ValidTextField(data)) return Toast.show('Required all fields');
  if (!EmailValidate(email)) return Toast.show('Invalid Email Address');
  if (Password_Validation(password)) return true;
  else return Toast.show('Please fill strong password');
};

export const description_Validation = (data: string) => {
  const arr = data.split(' ');
  const count = arr.filter(word => word !== '').length;
  if (count < 2) {
    Toast.show("Please Enter atleast 40 word's");
    return false;
  } else return true;
};

export const name_validate = (name: string) => {
  if (!ValidTextField({name})) return Toast.show('Please Enter Name');
  if (fullNames(name)) return true;
  else return Toast.show('Invalid Name');
};
