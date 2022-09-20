import {firebaseGetData, likeRecord} from '../../Firebase';

export function getDataAction(load: number, setLoader: any) {
  return (dispatch: any) => {
    dispatch(firebaseGetData(load, setLoader));
  };
}
export function getLikeAction() {
  return (dispatch: any) => {
    dispatch(likeRecord());
  };
}
