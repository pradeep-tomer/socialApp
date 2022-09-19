import {Get_Data, Like_Status} from '../types';

export const Initial_State = {
  data: '',
  likeRecord: '',
};

export const getDataReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case Get_Data:
      return {...state, data: action.payload};
    case Like_Status:
      return {...state, likeRecord: action.payload};
    default:
      return state;
  }
};
