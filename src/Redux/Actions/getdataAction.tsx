import {firebaseGetData} from '../../Firebase';

export function getDataAction() {
  return (dispatch: any) => {
    dispatch(firebaseGetData());
  };
}
