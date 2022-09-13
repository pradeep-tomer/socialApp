import {register} from '../../Firebase';
import {registrationType} from '../../Common/types';

export const registerAction = (data: registrationType) => {
  return (dispatch: any) => {
    dispatch(register(data));
  };
};
