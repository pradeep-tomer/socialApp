import {galleryOpen} from '../../Firebase';

export function galleryAction() {
  return (dispatch: any) => {
    dispatch(galleryOpen());
  };
}
