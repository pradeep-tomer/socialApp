import {googleLogin} from '../../Firebase';

export const googleAction = () => {
  return (dispatch: any) => {
    dispatch(googleLogin());
  };
};
