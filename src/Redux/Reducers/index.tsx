// this. File combines all reducer and export them
import {combineReducers} from 'redux';

import {loginReducer} from './loginReducer';
import {imageReducer} from './lmageReducer';
import {getDataReducer} from './getdataReducer';
import {nameReducer} from './nameReducer';

const appReducer = combineReducers({
  loginReducer,
  imageReducer,
  getDataReducer,
  nameReducer,
});

export default appReducer;
