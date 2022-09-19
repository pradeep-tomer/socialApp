import {Loader_status, Login_Success, Logout_Success} from '../types';

export const Initial_State = {
  hideProgress: false,
  authStatus: '',
  userInfo: '',
};

export const loginReducer = (state = Initial_State, action: any) => {
  switch (action.type) {
    case Login_Success:
      return {
        ...state,
        userInfo: action.payload,
        authStatus: 'Token',
        hideProgress: true,
      };
    case Logout_Success:
      return {...state, authStatus: null, hideProgress: true};
    case Loader_status:
      return {...state, authStatus: action.payload, hideProgress: true};
    default:
      return state;
  }
};
