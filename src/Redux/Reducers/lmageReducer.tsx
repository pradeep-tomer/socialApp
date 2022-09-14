import {Image_Success} from '../types';

export const Initial_State = {
  image_Url: '',
};

export const imageReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case Image_Success:
      return {...state, image_Url: action.payload};
    default:
      return state;
  }
};
