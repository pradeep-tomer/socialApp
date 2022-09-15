import {Get_Data} from '../types';

export const Initial_State = {
  data: '',
};

export const getDataReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case Get_Data:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
