import {View} from 'react-native';
import React from 'react';

//user-define Import files
import Navigator from './src/Navigation/navigator';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Navigator />
    </View>
  );
};

export default App;
