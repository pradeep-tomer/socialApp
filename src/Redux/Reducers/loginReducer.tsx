import {Login_Success, Logout_Success} from '../types';

export const Initial_State = {
  hideProgress: false,
  authStatus: '',
};

export const loginReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case Login_Success:
      return {...state, authStatus: action.payload, hideProgress: true};
    case Logout_Success:
      return {...state, authStatus: action.payload, hideProgress: true};
    default:
      return state;
  }
};