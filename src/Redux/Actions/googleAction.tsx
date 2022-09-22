import {googleLogin} from '../../Firebase';

export const googleAction = (setLoader: any) => {
  return (dispatch: any) => {
    dispatch(googleLogin(setLoader));
  };
};
