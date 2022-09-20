import {loginType} from '../../Common/types';
import {signIn, signOut} from '../../Firebase';

export const loginAction = (data: loginType, setLoader: any) => {
  return (dispatch: any) => {
    dispatch(signIn(data, setLoader));
  };
};

export function logOut() {
  return (dispatch: any) => {
    dispatch(signOut());
  };
}
