import {User_Name} from '../types';

export const Initial_State = {
  name: '',
};

export const nameReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case User_Name:
      return {...state, name: action.payload};
    default:
      return state;
  }
};
