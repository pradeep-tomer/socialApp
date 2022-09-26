import {Empty_Post, Get_Data} from '../types';

export const Initial_State = {
  data: '',
  last: undefined,
};

export const getDataReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case Get_Data:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        last: action.payload.last,
      };
    case Empty_Post:
      return {
        ...state,
        data: [],
        last: '',
      };
    default:
      return state;
  }
};
