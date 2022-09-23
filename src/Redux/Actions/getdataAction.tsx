import {firebaseGetData} from '../../Firebase';

export function getDataAction(setLoader: any) {
  return (dispatch: any) => {
    dispatch(firebaseGetData(setLoader));
  };
}
