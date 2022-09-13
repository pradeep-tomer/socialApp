// This file contains all common navigator method()
import {CommonActions, StackActions} from '@react-navigation/native';
let _navigator: any;
// Setting a Top level navigator from App.js
function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}
// Navigate to a particular screen
//params -> (Name of screen, parameters)
function navigate(routeName: string, params: any = {}) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}
// reset the current stack and navigate to a particular screen
//params -> (Name of screen, parameters)
function reset(routeName: string, params: any) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName}],
    }),
  );
}

function back() {
  _navigator.dispatch(CommonActions.goBack());
}

// add other navigation functions that you need and export them
export default {
  navigate,
  setTopLevelNavigator,
  reset,
  back,
};
