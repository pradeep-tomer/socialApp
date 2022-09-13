import {Register_Success} from '../types';

export const Initial_State = {
  image_Url: '',
};

export const registerReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case Register_Success:
      return {...state, image_Url: action.payload};
    default:
      return state;
  }
};
