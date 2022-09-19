import {firebaseGetData, likeRecord} from '../../Firebase';

export function getDataAction(load: number) {
  return (dispatch: any) => {
    dispatch(firebaseGetData(load));
  };
}
export function getLikeAction() {
  return (dispatch: any) => {
    dispatch(likeRecord());
  };
}
