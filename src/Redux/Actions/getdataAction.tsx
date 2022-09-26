import {firebaseGetData} from '../../Firebase';

export function getDataAction(setLoader: any, loadData: any) {
  return (dispatch: any) => {
    dispatch(firebaseGetData(setLoader, loadData));
  };
}
