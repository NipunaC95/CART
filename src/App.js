import React, {Component} from 'react'; 
import TabNavigator from "./navigators/secondryTabNavigator";
import StackNavigator from "./navigators/mainStackNavigator";
   
class App extends Component {
 

  render() {
    return (   
      <StackNavigator /> 
    );
  }
}

export default App;
