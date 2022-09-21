import {firebaseGetData} from '../../Firebase';

export function getDataAction(load: number, setLoader: any) {
  return (dispatch: any) => {
    dispatch(firebaseGetData(load, setLoader));
  };
}
