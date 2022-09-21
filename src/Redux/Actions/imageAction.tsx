import {galleryOpen} from '../../Firebase';
import {Image_Success} from '../types';

export function galleryAction() {
  return (dispatch: any) => {
    dispatch(galleryOpen());
  };
}

export function EmptyImage() {
  return {
    type: Image_Success,
    payload: '',
  };
}
