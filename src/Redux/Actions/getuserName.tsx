import {getUserName} from '../../Firebase';

export const userNameAction = (uid: string) => {
  return (dispatch: any) => {
    dispatch(getUserName(uid));
  };
};
