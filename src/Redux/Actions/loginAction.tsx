import {loginType} from '../../Common/types';
import {signIn, signOut} from '../../Firebase';

export const loginAction = (data: loginType) => {
  return (dispatch: any) => {
    dispatch(signIn(data));
  };
};

export function logOut() {
  return (dispatch: any) => {
    dispatch(signOut());
  };
}
