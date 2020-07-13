import React, {Component} from 'react'; 
import TabNavigator from "./navigators/secondryTabNavigator";
import StackNavigator from "./navigators/mainStackNavigator";
   
class App extends Component {
 

  render() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed' , 'Failed prop type'];
    return (    
      <StackNavigator /> 
    );
  }
}

export default App;
