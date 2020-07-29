import React, {Component} from 'react';
import StackNavigator from './navigators/mainStackNavigator';
import {BackHandler} from 'react-native';

class App extends Component {
 
  render() {
    console.ignoredYellowBox = [
      'Warning: Each',
      'Warning: Failed',
      'Failed prop type',
    ];

    return <StackNavigator />;
  }
}

export default App;
