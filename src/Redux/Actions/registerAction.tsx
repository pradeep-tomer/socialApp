import {register} from '../../Firebase';
import {registrationType} from '../../Common/types';

export const registerAction = (data: registrationType, setLoader: any) => {
  return (dispatch: any) => {
    dispatch(register(data, setLoader));
  };
};
