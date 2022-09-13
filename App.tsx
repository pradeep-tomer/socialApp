import React from 'react';
import {Provider} from 'react-redux';

//user-define Import files
import Navigator from './src/Navigation/navigator';
import {store} from './src/Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
