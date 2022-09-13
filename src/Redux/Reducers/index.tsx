// this. File combines all reducer and export them
import {combineReducers} from 'redux';

import {loginReducer} from './loginReducer';

const appReducer = combineReducers({
  loginReducer,
});

export default appReducer;
