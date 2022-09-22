import {getUserName} from '../../Firebase';

export const userNameAction = () => {
  return (dispatch: any) => {
    dispatch(getUserName());
  };
};
