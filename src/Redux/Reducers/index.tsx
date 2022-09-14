// this. File combines all reducer and export them
import {combineReducers} from 'redux';

import {loginReducer} from './loginReducer';
import {imageReducer} from './lmageReducer';

const appReducer = combineReducers({
  loginReducer,
  imageReducer,
});

export default appReducer;
